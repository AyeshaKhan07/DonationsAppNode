export interface FundraiserSelect {
    values?: {
        id?: boolean,
        name?: boolean,
        goal?: boolean,
        story?: boolean,
        pageType?: boolean,
        teamPage?: boolean,
        totalFundsRaised?: boolean,
    },

    relations?: {
        city?: boolean,
        country?: boolean,
        currency?: boolean,
        pageOwner?: boolean,
        donations?: boolean,
        teamMembers?: boolean,
    }
}
