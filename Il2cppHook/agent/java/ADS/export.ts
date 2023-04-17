const B_ShowAD = () => {
    D()
    BF('showInterstitial')
    BF('ShowRewardedInterstitialAd')
    BF('showRewardedAd')
    BF('ShowBannerAd')
    BF('Banner')
    BF('AppOpenAd')
    BF('CrossPromoAd')
    BF('ShowRV')
}

const B_LOGS = () => {
    BF('LogPurchase')
    BF('LogAppEvent')
}

export { }

declare global {
    var B_ShowAD: () => void
    var B_LOGS: () => void
}

globalThis.B_ShowAD = B_ShowAD
globalThis.B_LOGS = B_LOGS