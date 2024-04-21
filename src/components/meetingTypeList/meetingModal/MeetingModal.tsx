import { ReactNode } from 'react';

import Image from 'next/image';

import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MeetingModalProps {
    isOpen: boolean;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
    title: string;
    onClose?: () => void;
}

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    className,
    children,
    handleClick,
    buttonText,
    image,
    buttonIcon,
}: MeetingModalProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent
                className="flex w-full max-w-[520px] flex-col gap-6
            border-none bg-dark-1 px-6 py-9 text-white"
            >
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image src={image} alt="image" width={72} height={72} />
                        </div>
                    )}
                    <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                    {children}
                    <Button
                        className="bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                        onClick={handleClick}
                    >
                        {buttonIcon && (
                            <Image src={buttonIcon} alt="button icon" width={13} height={13} />
                        )}{' '}
                        &nbsp
                        {buttonText || 'Schedule Meeting'}
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default MeetingModal;
