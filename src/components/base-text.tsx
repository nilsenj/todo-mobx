interface Props
    extends React.HTMLAttributes<HTMLDivElement>,
        React.DOMAttributes<HTMLDivElement> {
    innerref?: any
}

export const BaseText = (props: Props) => {
    return (
        <div
            ref={props.innerref}
            {...props}
            className={`text-dark dark:text-light text-base ${props.className}`}
        >
            {props.children}
        </div>
    )
}