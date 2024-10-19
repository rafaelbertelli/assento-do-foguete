import { Link, LinkProps, useLocation } from "react-router-dom";

type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();

  console.log(pathname, props.to);
  return (
    <Link
      data-current={props.to === pathname}
      {...props}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
    />
  );
}