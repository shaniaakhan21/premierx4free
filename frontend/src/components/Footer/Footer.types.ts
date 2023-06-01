export interface FooterItem {
  title: string,
  link: string
}

export interface FooterColumn {
  title: string,
  items: FooterItem[]
}

export interface FooterSocialShare {
  icon: string;
  link: string
}
