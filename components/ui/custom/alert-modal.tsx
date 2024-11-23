"use client";

import { useEffect, useState } from "react";

import { Button, ButtonProps } from "../button";
import { Modal } from "../modal";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    title?: string;
    description?: string;
    variant?: ButtonProps["variant"];
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    variant = "destructive",
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Modal
            title={title}
            description={description}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant={variant}
                    onClick={onConfirm}
                >
                    Continue
                </Button>
            </div>
        </Modal>
    );
};
