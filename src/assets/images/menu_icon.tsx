class Props {
  onClick?: () => void;
}

export default function MenuIcon(props: Props) {
  return (
    <svg style={{ cursor: "pointer" }} onClick={props.onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_7_45)">
        <path d="M20 18C20.5523 18 21 18.4477 21 19C21 19.5128 20.614 19.9355 20.1166 19.9933L20 20H4C3.44772 20 3 19.5523 3 19C3 18.4872 3.38604 18.0645 3.88338 18.0067L4 18H20ZM20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20ZM20 4C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H20Z" fill="#09244B" />
      </g>
      <defs>
        <clipPath id="clip0_7_45">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}