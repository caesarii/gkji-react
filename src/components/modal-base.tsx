import React, { forwardRef, ReactNode, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';


export interface ModalBaseProps {
    title?: string;
    children?: ReactNode;
    afterClose?: () => void;
    width?: string | number;
}

const ModalBase = forwardRef(function ModalBase(props: ModalBaseProps, ref: any) {
    const { children, afterClose, title, width } = props;
    const [visible, setVisible] = useState(true);

    function handleOnClose() {
        setVisible(false);
    }

    const handleAfterClose = useCallback(() => {
        if (afterClose) {
            afterClose();
        }
    }, [afterClose]);

    return (
        <Modal
            // ref={ref}
            title={title}
            onCancel={handleOnClose}
            afterClose={handleAfterClose}
            visible={visible}
            footer={null}
            width={width}
        >
            {children}
        </Modal>
    );
});

export interface OpenOption {
    title?: string;
    content?: ReactNode;
    width?: string | number;
}

export function open(option: OpenOption) {
    const div = document.createElement('div');

    function destroy() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (!unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    const config: ModalBaseProps = {
        title: option.title,
        children: option.content,
        width: option.width,
        afterClose: destroy
    };

    function render(props: any) {
        ReactDOM.render(<ModalBase {...props} />, div);
    }

    render(config);
}

export default ModalBase;
