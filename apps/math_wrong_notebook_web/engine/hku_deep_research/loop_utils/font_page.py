from rich.table import Table
from rich.console import Console
from rich.text import Text
from rich.panel import Panel
from rich.style import Style
from rich.console import Console
from rich.box import DOUBLE
from rich.markdown import Markdown


MC_LOGO = """\
    █████╗ ██╗   ██╗████████╗ ██████╗  █████╗  ██████╗ ███████╗███╗   ██╗████████╗
   ██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝
███████║██║   ██║   ██║   ██║   ██║███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║      
██╔══██║██║   ██║   ██║   ██║   ██║██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║      
██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║      
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝      
╔═══ 𝒞𝓇𝑒𝒶𝓉𝑒 𝒜𝑔𝑒𝓃𝓉𝒾𝒸 𝒜ℐ 𝓊𝓈𝒾𝓃𝑔 ℒ𝒶𝓃𝑔𝓊𝒶𝑔𝑒 ═══╗\
"""

version_table = Table(show_header=False, box=DOUBLE, expand=True)
version_table.add_column("Key", style="cyan")
version_table.add_column("Value", style="green")

version_table.add_row("Version", "0.1.0")
version_table.add_row("Author", "AutoAgent Team@HKU")
version_table.add_row("License", "MIT")

NOTES = """\
* It's the simple yet powerful Open-Sourced Deep Research based on **AutoAgent** Framework.
* Type **ANY** request to the agent to start the deep research, agents will automatically execute tools and return the results to you
* `@` to mention the agent to do specific tasks: 
    * `@Web_Surfer_Agent`: specialize in browsing the web and extracting information
    * `@File_Surfer_Agent`: specialize in analyzing local files
    * `@Coding_Agent`: specialize in coding and debugging
    * `@System_Triage_Agent`: specialize in recieving the complex tasks and triage them into smaller tasks to be handled by other agents
    * `@Upload_Files`: upload files to the workplace of agents
"""
NOTES = Markdown(NOTES)

GOODBYE_LOGO = """\
███████╗███████╗███████╗    ██╗   ██╗ ██████╗ ██╗   ██╗
██╔════╝██╔════╝██╔════╝    ╚██╗ ██╔╝██╔═══██╗██║   ██║
███████╗█████╗  █████╗       ╚████╔╝ ██║   ██║██║   ██║
╚════██║██╔══╝  ██╔══╝        ╚██╔╝  ██║   ██║██║   ██║
███████║███████╗███████╗       ██║   ╚██████╔╝╚██████╔╝
╚══════╝╚══════╝╚══════╝       ╚═╝    ╚═════╝  ╚═════╝ 
· 𝓜𝓮𝓽𝓪𝓒𝓱𝓪𝓲𝓷-𝓐𝓘 ·           
""".strip()


