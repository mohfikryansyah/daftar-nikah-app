import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onChange, defaultValue }: { defaultValue?: string; onChange: (base64: string) => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sigPadRef = useRef<SignatureCanvas | null>(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 200 });

    // ukur ulang canvas pas mount
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const width = container.offsetWidth;
            setDimensions({ width, height: 200 });
        }
    }, []);

    const hasRestored = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !sigPadRef.current) return;

        const width = container.offsetWidth;
        const height = 200;

        setDimensions({ width, height });

        const canvas = sigPadRef.current.getCanvas();
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // restore tanda tangan kalau ada
        if (defaultValue && !hasRestored.current) {
            sigPadRef.current.clear();
            sigPadRef.current.fromDataURL(defaultValue);
            hasRestored.current = true;
        }
    }, []);

    const clear = () => sigPadRef.current?.clear();

    const handleEnd = () => {
        const base64 = sigPadRef.current?.toDataURL();
        if (base64) onChange(base64);
    };

    return (
        <div ref={containerRef} className="w-full">
            <SignatureCanvas
                ref={sigPadRef}
                penColor="black"
                canvasProps={{
                    width: dimensions.width,
                    height: dimensions.height,
                    className: 'border border-black rounded-xl w-full',
                }}
                onEnd={handleEnd}
            />
            <Button type="button" variant="ghost" onClick={clear}>
                Clear
            </Button>
        </div>
    );
};

export default SignaturePad;
