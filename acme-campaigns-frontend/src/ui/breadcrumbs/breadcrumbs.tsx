import Link from "next/link";
import { Breadcrumbs as Component, Text } from "@mantine/core";

type BreadcrumbItemProps = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItemProps[];
};

export const Breadcrumbs = ({ items, ...props }: BreadcrumbsProps) => {
  return (
    <Component {...props} separator="/">
      {items.map((item, index) =>
        item.href ? (
          <Text key={index} component={Link} href={item.href} td="underline">
            {item.label}
          </Text>
        ) : (
          <Text key={index}>{item.label}</Text>
        )
      )}
    </Component>
  );
};
