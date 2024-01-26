import { notification } from "antd";

// Popup that informs the user about error by using the antd notification component
export const openNotificationError = (message, description) => {
    notification.error({
        message,
        description,
        duration: 2,
    });
};

// Popup that informs the user about success by using the antd notification component
export const openNotificationSuccess = (message, description) => {
    notification.success({
        message,
        description,
        duration: 2,
    });
};

// Popup that informs the user about warning by using the antd notification component
export const openNotificationWarning = (message, description) => {
    notification.warning({
        message,
        description,
        duration: 2,
    });
};

// Popup that informs the user about info by using the antd notification component
export const openNotificationInfo = (message, description) => {
    notification.info({
        message,
        description,
        duration: 2,
    });
};