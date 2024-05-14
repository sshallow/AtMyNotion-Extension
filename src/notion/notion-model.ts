
// 用户偏好设置
export interface UserPreferences {
    // 用户是否已登录
    isLoggedIn: boolean;

    // 当前用户选择的工作空间
    currentSpace: SpaceInfo;

    // 是否启用了搜索过滤
    SearchWithFiltersEnabled: boolean;

    // 是否启用了搜索@AtMyNotion
    SearchWithAtMyNotionEnabled: boolean;
}

// 用户信息
export interface UserInfo {
    id: string
    name: string
    email: string
    profile_photo: string
}

// 工作区信息
export interface SpaceInfo {
    id: string
    name: string
    icon: string
    domain: string
    publicDomainIds: string[]
}

export interface GetSpacesResponse {
    [userId: string]: {
        __version__: number
        notion_user: {
            [userId: string]: {
                value: UserInfo
                role: string
            }
        }
        space: {
            [spaceId: string]: {
                value: SpaceInfo
                role: string
            }
        }
    }
}
