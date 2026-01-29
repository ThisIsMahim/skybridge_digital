
interface RollingTextProps {
    text: string;
    className?: string;
}

export const RollingText = ({ text, className = "" }: RollingTextProps) => {
    // Pure CSS implementation using group-hover for maximum performance (no JS/React state)
    // Note: The parent container must have the 'group' class for this to work.

    return (
        <div className={`relative inline-block overflow-hidden ${className} w-full`}>
            <div className="relative">
                {/* Original Text - Slides Up and Left */}
                <div
                    className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                >
                    {text}
                </div>

                {/* Duplicate text - Slides In from bottom and Right */}
                <div
                    className="absolute top-0 left-0 block text-accent translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] w-full group-hover:translate-y-0 group-hover:translate-x-2"
                >
                    {text}
                </div>
            </div>
        </div>
    );
};
