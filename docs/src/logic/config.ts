export interface SiteConfig {
  nav?: NavItem[] | false
  sidebar?: SideBarConfig | MultiSideBarConfig
}

// navbar --------------------------------------------------------------------

export type NavItem = NavItemWithLink | NavItemWithChildren

export interface NavItemBase {
  text: string
  target?: string
  rel?: string
  ariaLabel?: string
  activeMatch?: string
}

export interface NavItemWithLink extends NavItemBase {
  link: string
}

export interface NavItemWithChildren extends NavItemBase {
  items: NavItemWithLink[]
}

// sidebar -------------------------------------------------------------------

export type SideBarConfig = SideBarItem[] | 'auto' | false

export interface MultiSideBarConfig {
  [path: string]: SideBarConfig
}

export type SideBarItem = SideBarLink | SideBarGroup

export interface SideBarLink {
  text: string
  link: string
}

export interface SideBarGroup {
  text: string
  link?: string

  /**
   * @default false
   */
  collapsable?: boolean

  children: SideBarItem[]
}
