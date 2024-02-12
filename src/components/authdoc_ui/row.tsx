import './row.scss';

class Props {
  children?: React.ReactNode;
  gap?: number;
  style?: React.CSSProperties
}

export default function Row(props: Props) {
  return (
    <div className="studium_ui_row" style={{ ...props.style,
      gap: props.gap !== undefined ? `${props.gap}px` : undefined,
    }}>
      {props.children}
    </div>
  );
}
