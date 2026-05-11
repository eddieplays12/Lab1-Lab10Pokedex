import subprocess
from pathlib import Path
root = Path(r"c:\xampp\htdocs\Experiment")
result = subprocess.run(
    [r"C:\Program Files\Git\cmd\git.exe", "push", "-u", "origin", "main"],
    cwd=root,
    capture_output=True,
    text=True,
)
print("returncode=", result.returncode)
print("stdout=\n" + result.stdout)
print("stderr=\n" + result.stderr)
