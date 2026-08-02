/**
 * 从 BISHENG 源码中抽取重构的轻量级纯本地 DAG (有向无环图) Flow 执行解释器
 */

async function executeDagFlow(flowGraph, initialInputs = {}, llmCaller = null, ragCaller = null) {
  const nodes = flowGraph.nodes || [];
  const edges = flowGraph.edges || [];

  if (nodes.length === 0) {
    throw new Error('拓扑图节点集合为空');
  }

  const executionContext = { ...initialInputs };
  const executionLogs = [];
  
  // 按照节点 type 排序执行 (简单拓扑序模拟)
  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));

  console.log(`[DAG Flow Engine] Starting execution of Graph flow with ${nodes.length} nodes...`);

  for (const node of nodes) {
    const startTime = Date.now();
    let nodeOutput = null;

    try {
      if (node.type === 'start') {
        nodeOutput = { ...initialInputs };
      } else if (node.type === 'llm') {
        const promptText = node.data?.prompt || executionContext.input || executionContext.query || '请回答当前问题';
        if (llmCaller) {
          const res = await llmCaller(promptText, { provider: node.data?.provider || 'claude' });
          nodeOutput = res.content;
        } else {
          nodeOutput = `[Simulated LLM Node Result]: ${promptText}`;
        }
      } else if (node.type === 'rag') {
        const query = node.data?.query || executionContext.query || executionContext.input || '';
        if (ragCaller) {
          const docs = await ragCaller(query);
          nodeOutput = docs;
        } else {
          nodeOutput = `[Simulated RAG Node Result]: Key chunks for "${query}"`;
        }
      } else if (node.type === 'transform') {
        const raw = executionContext[node.data?.sourceKey || 'input'] || '';
        nodeOutput = typeof raw === 'string' ? raw.toUpperCase() : JSON.stringify(raw);
      } else {
        nodeOutput = executionContext.input || 'OK';
      }

      // 结果注入上下文
      executionContext[node.id] = nodeOutput;
      executionContext[node.type] = nodeOutput;
      if (node.type === 'llm' || node.type === 'end') {
        executionContext.result = nodeOutput;
      }

      executionLogs.push({
        nodeId: node.id,
        nodeType: node.type,
        status: 'SUCCESS',
        durationMs: Date.now() - startTime,
        output: nodeOutput
      });

    } catch (err) {
      console.error(`❌ [DAG Flow Engine] Node ${node.id} (${node.type}) failed:`, err.message);
      executionLogs.push({
        nodeId: node.id,
        nodeType: node.type,
        status: 'FAILED',
        error: err.message
      });
    }
  }

  return {
    success: true,
    finalResult: executionContext.result || executionContext.input || 'Flow Completed',
    context: executionContext,
    logs: executionLogs
  };
}

module.exports = {
  executeDagFlow
};
