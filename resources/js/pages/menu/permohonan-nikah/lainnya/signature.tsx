import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onChange, defaultValue }: { defaultValue?: string; onChange: (file: File | null) => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sigPadRef = useRef<SignatureCanvas | null>(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 200 });
    const [isInitialized, setIsInitialized] = useState(false);
    const lastDefaultValue = useRef<string | undefined>(undefined);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const width = container.offsetWidth;
            setDimensions({ width, height: 200 });
        }
    }, []);

    useEffect(() => {
        // Only restore signature if:
        // 1. Canvas is ready
        // 2. We have a defaultValue
        // 3. The defaultValue has changed from the last one
        // 4. Component is not already initialized with this value
        if (
            defaultValue && 
            sigPadRef.current && 
            defaultValue !== lastDefaultValue.current &&
            !isInitialized
        ) {
            const canvas = sigPadRef.current.getCanvas();
            canvas.width = dimensions.width;
            canvas.height = dimensions.height;
            canvas.style.width = `${dimensions.width}px`;
            canvas.style.height = `${dimensions.height}px`;

            // Clear first, then restore
            sigPadRef.current.clear();
            
            // Use setTimeout to ensure canvas is ready
            setTimeout(() => {
                if (sigPadRef.current && defaultValue) {
                    sigPadRef.current.fromDataURL(defaultValue);
                    setIsInitialized(true);
                    lastDefaultValue.current = defaultValue;
                }
            }, 100);
        }
    }, [defaultValue, dimensions.width, isInitialized]);

    const clear = () => {
        sigPadRef.current?.clear();
        setIsInitialized(false);
        lastDefaultValue.current = undefined;
        onChange(null);
    };

    const handleEnd = async () => {
        const canvas = sigPadRef.current;
        if (!canvas || canvas.isEmpty()) return;

        const dataURL = canvas.toDataURL('image/png');
        const blob = await (await fetch(dataURL)).blob();
        const file = new File([blob], `ttd-${Date.now()}.png`, {
            type: 'image/png',
        });

        onChange(file);
        setIsInitialized(true);
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
                Bersihkan
            </Button>
        </div>
    );
};

export default SignaturePad;