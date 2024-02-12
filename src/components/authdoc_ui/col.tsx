import { className } from '../../utils/className';
import './col.scss';

class Props {
  children?: React.ReactNode;
  col?: number;
  colXs?: number;
  colSm?: number;
  colMd?: number;
  colLg?: number;
  colXl?: number;
  colXll?: number;
}

export default function Col(props: Props) {
  return (
    <div className={className([
      "authdoc_ui_col",
      props.col !== undefined ? `authdoc_ui_col_${props.col}` : "",
      props.colXs !== undefined ? `authdoc_ui_col_xs_${props.colXs}` : "",
      props.colSm !== undefined ? `authdoc_ui_col_sm_${props.colSm}` : "",
      props.colMd !== undefined ? `authdoc_ui_col_md_${props.colMd}` : "",
      props.colLg !== undefined ? `authdoc_ui_col_lg_${props.colLg}` : "",
      props.colXl !== undefined ? `authdoc_ui_col_xl_${props.colXl}` : "",
      props.colXll !== undefined ? `authdoc_ui_col_xll_${props.colXll}` : "",
    ])}>
      {props.children}
    </div>
  );
}
