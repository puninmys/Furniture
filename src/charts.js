// Chart and data visualization functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    initializeHeroChart();
    initializeMarketChart();
    initializeRealTimeUpdates();
}

// Hero Chart
function initializeHeroChart() {
    const canvas = document.getElementById('hero-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Generate sample data for a trending upward stock chart
    const dataPoints = generateStockData(50, 1000, 1500);
    
    function drawChart() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up styling
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Calculate scales
        const maxValue = Math.max(...dataPoints);
        const minValue = Math.min(...dataPoints);
        const valueRange = maxValue - minValue;
        const xStep = width / (dataPoints.length - 1);
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        dataPoints.forEach((value, index) => {
            const x = index * xStep;
            const y = height - ((value - minValue) / valueRange) * height;
            
            if (index === 0) {
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        
        // Draw main line
        ctx.beginPath();
        dataPoints.forEach((value, index) => {
            const x = index * xStep;
            const y = height - ((value - minValue) / valueRange) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#3b82f6';
        dataPoints.forEach((value, index) => {
            const x = index * xStep;
            const y = height - ((value - minValue) / valueRange) * height;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Add price labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'right';
        
        // Max price
        const maxY = height - ((maxValue - minValue) / valueRange) * height;
        ctx.fillText(`₹${maxValue.toFixed(0)}`, width - 5, maxY + 4);
        
        // Min price
        const minY = height - ((minValue - minValue) / valueRange) * height;
        ctx.fillText(`₹${minValue.toFixed(0)}`, width - 5, minY - 5);
        
        // Current price (last point)
        const currentValue = dataPoints[dataPoints.length - 1];
        const currentY = height - ((currentValue - minValue) / valueRange) * height;
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillText(`₹${currentValue.toFixed(2)}`, width - 5, currentY - 10);
    }
    
    drawChart();
    
    // Animate chart on load
    let animationProgress = 0;
    const animationDuration = 2000;
    const startTime = Date.now();
    
    function animateChart() {
        const currentTime = Date.now();
        animationProgress = Math.min((currentTime - startTime) / animationDuration, 1);
        
        // Clear and redraw with animation
        ctx.clearRect(0, 0, width, height);
        
        const animatedDataPoints = dataPoints.slice(0, Math.floor(animationProgress * dataPoints.length));
        
        if (animatedDataPoints.length > 1) {
            drawAnimatedChart(animatedDataPoints);
        }
        
        if (animationProgress < 1) {
            requestAnimationFrame(animateChart);
        } else {
            drawChart(); // Final draw
        }
    }
    
    function drawAnimatedChart(points) {
        if (points.length < 2) return;
        
        const maxValue = Math.max(...dataPoints);
        const minValue = Math.min(...dataPoints);
        const valueRange = maxValue - minValue;
        const xStep = width / (dataPoints.length - 1);
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        points.forEach((value, index) => {
            const x = index * xStep;
            const y = height - ((value - minValue) / valueRange) * height;
            ctx.lineTo(x, y);
        });
        
        ctx.lineTo((points.length - 1) * xStep, height);
        ctx.closePath();
        ctx.fill();
        
        // Draw line
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        points.forEach((value, index) => {
            const x = index * xStep;
            const y = height - ((value - minValue) / valueRange) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
    }
    
    animateChart();
}

// Market Overview Chart
function initializeMarketChart() {
    const canvas = document.getElementById('market-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Generate multiple stock data series
    const stocks = [
        { name: 'NIFTY 50', color: '#3b82f6', data: generateStockData(100, 21000, 21500) },
        { name: 'SENSEX', color: '#10b981', data: generateStockData(100, 70000, 71000) },
        { name: 'BANK NIFTY', color: '#f59e0b', data: generateStockData(100, 45000, 46000) }
    ];
    
    function drawMarketChart() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        drawGrid();
        
        // Draw each stock line
        stocks.forEach((stock, index) => {
            drawStockLine(stock, index);
        });
        
        // Draw legend
        drawLegend();
        
        // Draw axis labels
        drawAxisLabels();
    }
    
    function drawGrid() {
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 0; i <= 10; i++) {
            const x = (width * i) / 10;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 6; i++) {
            const y = (height * i) / 6;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }
    
    function drawStockLine(stock, index) {
        const maxValue = Math.max(...stock.data);
        const minValue = Math.min(...stock.data);
        const valueRange = maxValue - minValue;
        const xStep = width / (stock.data.length - 1);
        
        ctx.strokeStyle = stock.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        stock.data.forEach((value, dataIndex) => {
            const x = dataIndex * xStep;
            const y = height - ((value - minValue) / valueRange) * height;
            
            if (dataIndex === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw current price indicator
        const lastValue = stock.data[stock.data.length - 1];
        const lastX = (stock.data.length - 1) * xStep;
        const lastY = height - ((lastValue - minValue) / valueRange) * height;
        
        ctx.fillStyle = stock.color;
        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function drawLegend() {
        const legendX = 20;
        const legendY = 20;
        
        stocks.forEach((stock, index) => {
            const y = legendY + index * 25;
            
            // Color indicator
            ctx.fillStyle = stock.color;
            ctx.fillRect(legendX, y, 15, 3);
            
            // Label
            ctx.fillStyle = '#374151';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(stock.name, legendX + 25, y + 8);
            
            // Current value
            const currentValue = stock.data[stock.data.length - 1];
            const prevValue = stock.data[stock.data.length - 2];
            const change = currentValue - prevValue;
            const changePercent = ((change / prevValue) * 100).toFixed(2);
            
            ctx.fillStyle = change >= 0 ? '#10b981' : '#ef4444';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.fillText(
                `${currentValue.toFixed(0)} (${change >= 0 ? '+' : ''}${changePercent}%)`,
                legendX + 100,
                y + 8
            );
        });
    }
    
    function drawAxisLabels() {
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        
        // X-axis (time labels)
        const timeLabels = ['9:30', '10:30', '11:30', '12:30', '1:30', '2:30', '3:30'];
        timeLabels.forEach((label, index) => {
            const x = (width * index) / (timeLabels.length - 1);
            ctx.fillText(label, x, height - 5);
        });
        
        // Y-axis labels would require more complex calculation based on data ranges
    }
    
    drawMarketChart();
    
    // Update chart periodically
    setInterval(() => {
        // Add new data points
        stocks.forEach(stock => {
            stock.data.shift(); // Remove first point
            const lastValue = stock.data[stock.data.length - 1];
            const newValue = lastValue + (Math.random() - 0.5) * (lastValue * 0.002);
            stock.data.push(newValue);
        });
        
        drawMarketChart();
    }, 5000);
}

// Real-time Updates
function initializeRealTimeUpdates() {
    updateStockTicker();
    updatePriceTables();
    
    // Update every 3 seconds
    setInterval(() => {
        updateStockTicker();
        updatePriceTables();
    }, 3000);
}

function updateStockTicker() {
    const tickerItems = document.querySelectorAll('.ticker-item');
    
    tickerItems.forEach(item => {
        const priceMatch = item.textContent.match(/(\d+,?\d*\.?\d+)/);
        if (priceMatch) {
            const currentPrice = parseFloat(priceMatch[1].replace(',', ''));
            const change = (Math.random() - 0.5) * (currentPrice * 0.01);
            const newPrice = currentPrice + change;
            const changePercent = (change / currentPrice * 100).toFixed(2);
            
            const isPositive = change >= 0;
            const symbol = isPositive ? '▲' : '▼';
            const colorClass = isPositive ? 'green' : 'red';
            
            // Update the ticker item content
            const stockName = item.textContent.split(':')[0];
            item.innerHTML = `${stockName}: <span class="${colorClass}">${newPrice.toFixed(2)} ${symbol} ${Math.abs(changePercent)}%</span>`;
        }
    });
}

function updatePriceTables() {
    const priceRows = document.querySelectorAll('.price-row:not(.header)');
    
    priceRows.forEach(row => {
        const priceCell = row.children[1];
        const changeCell = row.children[2];
        
        if (priceCell && changeCell) {
            const currentPrice = parseFloat(priceCell.textContent.replace('₹', '').replace(',', ''));
            const change = (Math.random() - 0.5) * (currentPrice * 0.005);
            const newPrice = currentPrice + change;
            const changePercent = (change / currentPrice * 100).toFixed(2);
            
            priceCell.textContent = `₹${newPrice.toFixed(2)}`;
            
            const isPositive = change >= 0;
            changeCell.textContent = `${isPositive ? '+' : ''}${changePercent}%`;
            changeCell.className = isPositive ? 'green' : 'red';
            
            // Add flash effect
            row.style.backgroundColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
            setTimeout(() => {
                row.style.backgroundColor = '';
            }, 1000);
        }
    });
}

// Utility function to generate realistic stock data
function generateStockData(points, minPrice, maxPrice) {
    const data = [];
    let currentPrice = minPrice + Math.random() * (maxPrice - minPrice);
    
    for (let i = 0; i < points; i++) {
        // Add some trend and volatility
        const trend = 0.001; // Slight upward trend
        const volatility = 0.02; // 2% volatility
        
        const change = (Math.random() - 0.5) * volatility + trend;
        currentPrice = currentPrice * (1 + change);
        
        // Keep within bounds
        currentPrice = Math.max(minPrice, Math.min(maxPrice, currentPrice));
        
        data.push(currentPrice);
    }
    
    return data;
}

// Advanced Chart Features
function createInteractiveChart(canvasId, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    let isHovering = false;
    let hoverIndex = -1;
    
    function drawChart() {
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // Calculate data bounds
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const valueRange = maxValue - minValue;
        const xStep = width / (data.length - 1);
        
        // Draw chart line
        ctx.strokeStyle = options.color || '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = index * xStep;
            const y = height - ((value - minValue) / valueRange) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw hover indicator
        if (isHovering && hoverIndex >= 0) {
            const value = data[hoverIndex];
            const x = hoverIndex * xStep;
            const y = height - ((value - minValue) / valueRange) * height;
            
            // Vertical line
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Point
            ctx.fillStyle = options.color || '#3b82f6';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Tooltip
            const tooltipText = `₹${value.toFixed(2)}`;
            const textWidth = ctx.measureText(tooltipText).width;
            const tooltipX = Math.max(0, Math.min(width - textWidth - 20, x - textWidth / 2));
            const tooltipY = y - 30;
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(tooltipX, tooltipY - 20, textWidth + 20, 25);
            
            ctx.fillStyle = 'white';
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(tooltipText, tooltipX + textWidth / 2 + 10, tooltipY - 5);
        }
    }
    
    // Mouse events
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const xStep = canvas.width / (data.length - 1);
        
        hoverIndex = Math.round(x / xStep);
        isHovering = hoverIndex >= 0 && hoverIndex < data.length;
        
        drawChart();
    });
    
    canvas.addEventListener('mouseleave', () => {
        isHovering = false;
        drawChart();
    });
    
    // Initial draw
    drawChart();
    
    return {
        updateData: (newData) => {
            data = newData;
            drawChart();
        }
    };
}

// Candlestick Chart
function createCandlestickChart(canvasId, ohlcData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    function drawCandlestick() {
        ctx.clearRect(0, 0, width, height);
        
        const maxPrice = Math.max(...ohlcData.map(d => d.high));
        const minPrice = Math.min(...ohlcData.map(d => d.low));
        const priceRange = maxPrice - minPrice;
        const candleWidth = width / ohlcData.length * 0.6;
        const candleSpacing = width / ohlcData.length;
        
        ohlcData.forEach((candle, index) => {
            const x = index * candleSpacing + candleSpacing / 2;
            const openY = height - ((candle.open - minPrice) / priceRange) * height;
            const closeY = height - ((candle.close - minPrice) / priceRange) * height;
            const highY = height - ((candle.high - minPrice) / priceRange) * height;
            const lowY = height - ((candle.low - minPrice) / priceRange) * height;
            
            const isPositive = candle.close > candle.open;
            const bodyColor = isPositive ? '#10b981' : '#ef4444';
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.abs(closeY - openY);
            
            // Draw wick
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, highY);
            ctx.lineTo(x, lowY);
            ctx.stroke();
            
            // Draw body
            ctx.fillStyle = bodyColor;
            ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
            
            // Draw border
            ctx.strokeStyle = bodyColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
        });
    }
    
    drawCandlestick();
}

// Volume Chart
function createVolumeChart(canvasId, volumeData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    function drawVolume() {
        ctx.clearRect(0, 0, width, height);
        
        const maxVolume = Math.max(...volumeData);
        const barWidth = width / volumeData.length * 0.8;
        const barSpacing = width / volumeData.length;
        
        volumeData.forEach((volume, index) => {
            const x = index * barSpacing + barSpacing / 2;
            const barHeight = (volume / maxVolume) * height;
            const y = height - barHeight;
            
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);
        });
    }
    
    drawVolume();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateStockData,
        createInteractiveChart,
        createCandlestickChart,
        createVolumeChart
    };
}