import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onChange }: { onChange: (base64: string) => void }) => {
    const sigPad = useRef<SignatureCanvas | null>(null);

    const clear = () => sigPad.current?.clear();
    const save = () => {
        const dataURL = sigPad.current?.toDataURL();
        console.log(dataURL);
    };

    const handleEnd = () => {
        const base64 = sigPad.current?.toDataURL();
        if (base64) {
            onChange(base64);
        }
    };

    return (
        <div>
            <SignatureCanvas
                ref={sigPad}
                penColor="black"
                canvasProps={{ className: 'border border-black rounded-xl w-full md:h-[200px] h-[200px]' }}
                onEnd={handleEnd}
            />
            <Button type="button" variant={'ghost'} onClick={clear}>
                Clear
            </Button>
        </div>
    );
};

export default SignaturePad;
