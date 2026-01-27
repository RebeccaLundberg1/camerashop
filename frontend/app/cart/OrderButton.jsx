export default function OrderButton({className, ...props}) {
    return (
        <button {...props} className={`py-2 px-8 bg-blue-500 text-white rounded shadow-lg ${className}`}>
            Lägg order
        </button>
    );
}
