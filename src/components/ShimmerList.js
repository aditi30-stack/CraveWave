export const ShimmerList = () => {
    return (
        <div className="flex flex-wrap gap-4">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center w-full p-4">
                    <div className="rounded-full bg-gray-400 h-16 w-16 animate-pulse"></div>
                    <ul className="bg-gray-400 p-4 w-full animate-pulse rounded-xl">
                        <li className="h-4 mb-2"></li>
                    </ul>
                </div>
            ))}
        </div>
    );
};