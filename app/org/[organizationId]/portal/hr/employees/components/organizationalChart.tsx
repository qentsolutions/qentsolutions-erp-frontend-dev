"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Node,
    Edge,
    ReactFlowInstance,
} from 'react-flow-renderer';

const initialEmployees = [
    { id: '1', name: 'Alice', role: 'CEO', reportsTo: null },
    { id: '2', name: 'Bob', role: 'CTO', reportsTo: '1' },
    { id: '3', name: 'Charlie', role: 'CFO', reportsTo: '1' },
    { id: '4', name: 'David', role: 'Lead Engineer', reportsTo: '2' },
    { id: '5', name: 'Eva', role: 'Senior Developer', reportsTo: '4' },
    { id: '6', name: 'Frank', role: 'Junior Developer', reportsTo: '4' },
    { id: '7', name: 'Grace', role: 'Designer', reportsTo: '2' },
    { id: '8', name: 'Henry', role: 'HR Manager', reportsTo: '1' },
    { id: '9', name: 'Ivy', role: 'HR Specialist', reportsTo: '8' },
    { id: '10', name: 'Jack', role: 'Financial Analyst', reportsTo: '3' },
    { id: '11', name: 'Kate', role: 'Accountant', reportsTo: '3' },
];

const nodeWidth = 180;
const nodeHeight = 80;
const horizontalSpacing = 300; // Increased horizontal spacing
const verticalSpacing = 200; // Increased vertical spacing

const getLayoutedElements = (employees: any[]) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const levels: { [key: string]: number } = {};
    const childrenCount: { [key: string]: number } = {};

    // Calculate levels and count children
    const calculateLevels = (id: string, level: number) => {
        levels[id] = Math.max(level, levels[id] || 0);
        const children = employees.filter(e => e.reportsTo === id);
        childrenCount[id] = children.length;
        children.forEach(e => calculateLevels(e.id, level + 1));
    };
    calculateLevels('1', 0);

    // Create nodes and edges
    employees.forEach((emp) => {
        nodes.push({
            id: emp.id,
            data: { label: `${emp.name}\n${emp.role}` },
            position: { x: 0, y: 0 }, // We'll set the actual positions later
            style: { width: nodeWidth, height: nodeHeight },
        });

        if (emp.reportsTo) {
            edges.push({
                id: `e${emp.reportsTo}-${emp.id}`,
                source: emp.reportsTo,
                target: emp.id,
                type: 'smoothstep',
            });
        }
    });

    // Arrange nodes
    const arrangeNodes = (id: string, startX: number, level: number) => {
        const node = nodes.find(n => n.id === id);
        if (!node) return 0;

        const children = employees.filter(e => e.reportsTo === id);
        const totalWidth = Math.max(childrenCount[id] * horizontalSpacing, nodeWidth);
        node.position = {
            x: startX + totalWidth / 2 - nodeWidth / 2,
            y: level * verticalSpacing
        };

        let currentX = startX;
        children.forEach(child => {
            const childWidth = arrangeNodes(child.id, currentX, level + 1);
            currentX += childWidth;
        });

        return totalWidth;
    };

    arrangeNodes('1', 0, 0);

    return { nodes, edges };
};

interface OrganizationalChartProps {
    centerOnEmployee?: string;
}

export default function OrganizationalChart({ centerOnEmployee }: OrganizationalChartProps) {
    const { nodes: initialNodes, edges: initialEdges } = getLayoutedElements(initialEmployees);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const flowInstanceRef = useRef<ReactFlowInstance | null>(null);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    // Centrer sur l'employé lors du chargement du composant
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (flowInstanceRef.current && centerOnEmployee) {
                const nodeToCenter = initialNodes.find(node => node.data.label.startsWith(centerOnEmployee));
                if (nodeToCenter) {
                    const x = nodeToCenter.position.x + nodeWidth / 2;
                    const y = nodeToCenter.position.y + nodeHeight / 2;
                    flowInstanceRef.current.setCenter(x, y, { zoom: 1, duration: 1000 });
                }
            }
        }, 100); // Délai de 100 ms

        return () => clearTimeout(timeoutId); // Nettoyer le timeout
    }, [centerOnEmployee, initialNodes]);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                attributionPosition="bottom-left"
                nodesDraggable={false}
                onInit={(instance) => {
                    flowInstanceRef.current = instance;
                }}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
}
