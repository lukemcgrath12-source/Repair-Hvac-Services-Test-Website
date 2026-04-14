#!/usr/bin/env python3
import subprocess
import os
import time

url = "http://localhost:3000"
output_dir = "/Users/lukemcgrath/Desktop/WEBSITE BUILDING - REPAIRHVAC/temporary screenshots"

# Create output directory
os.makedirs(output_dir, exist_ok=True)

# Find next available filename
counter = 1
while os.path.exists(f"{output_dir}/screenshot-{counter}.png"):
    counter += 1

output_file = f"{output_dir}/screenshot-{counter}.png"

# Use Safari to take a screenshot via screencapture
try:
    # Try using webkit2png if available
    result = subprocess.run(['which', 'webkit2png'], capture_output=True)
    if result.returncode == 0:
        subprocess.run(['webkit2png', '-o', output_dir, url])
    else:
        # Fallback: use macOS screencapture (but this won't work for web content without X11)
        print(f"webkit2png not available. Please use Firefox or Chrome to open {url}")
        print("Or install webkit2png with: brew install webkit2png")
except Exception as e:
    print(f"Error: {e}")
    print(f"Please manually screenshot: {url}")

print(f"Screenshot would be saved to: {output_file}")
