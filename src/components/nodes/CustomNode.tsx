import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeProps extends NodeProps {
    data: {
        label: string;
        customStyle?: string;
    };
}

function CustomNode({ data }: CustomNodeProps) {
    return (
        <>
            <div
                className={`bg-primary p-4 pb-1 shadow-md border border-secondary rounded hover:ring-1 ring-foreground font-open-sans  ${data.customStyle}`}
            >
                <Handle type="target" position={Position.Top} className="bg-primary" />
                <div className="text-md font-semibold text-foreground">{data.label}</div>
                <div className="flex justify-center">
                    <button onClick={() => console.log("clicked")} className='hover:text-secondary'>+</button>
                </div>

                <Handle type="source" position={Position.Bottom} className="bg-secondary" />
            </div>

        </>
    );
};

export default CustomNode;