import './container.scss';

class Props {
  children?: React.ReactNode;
  horizontalPadding?: number;
  style?: React.CSSProperties;
}

export default function Container(props: Props) {
  return (
    <div>
      <div className="authdoc_ui_container" style={{
        paddingInline: props.horizontalPadding !== undefined ? `${props.horizontalPadding}px` : undefined,
        ...props.style,
      }}>
        {props.children}
      </div>
    </div>
  );
}
