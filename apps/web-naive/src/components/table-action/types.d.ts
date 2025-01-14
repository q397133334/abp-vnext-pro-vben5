import { TooltipProps } from 'element-plus';

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: string;
}
export interface ActionItem {
  type?:
    | 'default'
    | 'error'
    | 'info'
    | 'primary'
    | 'success'
    | 'tertiary'
    | 'warning';
  text?: boolean;
  size?: 'large' | 'medium' | 'small' | 'tiny';
  onClick?: Fn;
  label?: string;
  color?: string;
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: string[];
  // 业务控制是否显示
  ifShow?: ((action: ActionItem) => boolean) | boolean;
  tooltip?: string | TooltipProps;
}
