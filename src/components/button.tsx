import { MouseEventHandler, ReactNode } from 'react';
import { ImSpinner9 } from 'react-icons/im';

type IButtonProps = {
    children: ReactNode | string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: 'outline' | 'primary' | 'transparent';
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    form?: boolean;
};

export const Button = ({
    children,
    onClick,
    className,
    type,
    disabled,
    loading,
    loadingText,
    form
}: IButtonProps) => {
    const renderType = () => {
        switch (type) {
            case 'outline':
                return 'bg-gray-900 disabled:border-indigo-900';
            case 'transparent':
                return '!border-0 !bg-transparent hover:text-neutral-300 !p-0';
            default:
                return 'bg-indigo-800 hover:bg-indigo-900 disabled:bg-indigo-900 disabled:text-neutral-400 disabled:border-indigo-900';
        }
    };
    return (
        <button
            type={form ? 'submit' : 'button'}
            onClick={onClick}
            disabled={disabled}
            className={`${className} ${renderType()} px-2.5 py-1.5 lg:px-4 lg:py-2.5 rounded shadow disabled:cursor-not-allowed transition duration-150 border-2 border-indigo-800 hover:border-indigo-900 flex items-center gap-2 text-center justify-center`}
        >
            {loadingText && loading ? loadingText : children}
            {loading && <ImSpinner9 className="animate-spin" />}
        </button>
    );
};
