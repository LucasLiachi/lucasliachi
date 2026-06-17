import numpy as np
import matplotlib.pyplot as plt
from typing import List, Tuple

def calculate_control_limits(data: List[float]) -> Tuple[float, float, float]:
    mean = np.mean(data)
    std = np.std(data)
    ucl = mean + (3 * std)
    lcl = mean - (3 * std)
    return ucl, mean, lcl

def create_control_chart(data: List[float], title: str = "Statistical Process Control Chart"):
    # Generate time points
    time_points = range(len(data))
    
    # Calculate limits
    ucl, mean_line, lcl = calculate_control_limits(data)
    
    # Create plot
    plt.figure(figsize=(12, 6))
    
    # Plot data and control limits
    plt.plot(time_points, data, 'b-o', label='Process Data', markersize=4)
    plt.axhline(y=ucl, color='r', linestyle='--', label='UCL (+3σ)')
    plt.axhline(y=mean_line, color='g', linestyle='-', label='Mean')
    plt.axhline(y=lcl, color='r', linestyle='--', label='LCL (-3σ)')
    
    # Styling
    plt.grid(True, alpha=0.3)
    plt.title(title, pad=20)
    plt.xlabel('Time')
    plt.ylabel('Process Value')
    plt.legend()
    
    return plt

# Example usage
if __name__ == "__main__":
    # Generate sample data
    np.random.seed(42)
    sample_data = np.random.normal(100, 10, 30)
    
    # Create and show chart
    chart = create_control_chart(sample_data)
    chart.show()
