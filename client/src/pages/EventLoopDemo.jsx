import { useState } from 'react';
import { demonstrateEventLoop } from '../demos/eventLoopDemo';

function EventLoopDemo() {
    const [logs, setLogs] = useState([]);

    const runDemo = () => {
        setLogs([]); // Clear previous logs
        
        const addLog = (logItem) => {
            setLogs((prevLogs) => [...prevLogs, logItem]);
        };

        // Call the demonstration function with our state-updating callback
        demonstrateEventLoop(addLog);
    };

    const clearLogs = () => setLogs([]);

    return (
        <main className="event-loop-demo-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Event Loop Demonstration</h1>
            <p>
                This interactive demo explicitly proves the execution order between the 
                <strong> Call Stack</strong>, <strong>Microtask Queue</strong>, and <strong>Macrotask Queue</strong>.
            </p>

            <div style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" onClick={runDemo}>Run Event Loop Demo</button>
                <button className="btn btn-outline" onClick={clearLogs}>Clear</button>
            </div>

            <div className="demo-visualizer" style={{ backgroundColor: '#1e1e1e', padding: '1.5rem', borderRadius: '8px', color: '#fff', minHeight: '300px' }}>
                <h3>Execution Output:</h3>
                {logs.length === 0 ? (
                    <p style={{ color: '#888' }}>Waiting for execution...</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {logs.map((log, index) => {
                            let color = '#fff';
                            if (log.type === 'sync') color = '#4ade80'; // Green for Sync
                            if (log.type === 'microtask') color = '#60a5fa'; // Blue for Microtask
                            if (log.type === 'macrotask') color = '#f87171'; // Red for Macrotask

                            return (
                                <li key={index} style={{ color, padding: '0.5rem 0', borderBottom: '1px solid #333' }}>
                                    <strong>[{log.type.toUpperCase()}]</strong> {log.message}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className="demo-legend" style={{ marginTop: '1rem', display: 'flex', gap: '15px' }}>
                <span style={{ color: '#4ade80' }}>■ Call Stack (Synchronous)</span>
                <span style={{ color: '#60a5fa' }}>■ Microtask (Promises)</span>
                <span style={{ color: '#f87171' }}>■ Macrotask (setTimeout)</span>
            </div>
        </main>
    );
}

export default EventLoopDemo;
