import * as woothee from "woothee";
const DEFAULT_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
const ANDROID_MOBILE = /Android.+Mobi(le)?/;
export class UA {
    constructor(ua) {
        this._ua = ua;
        this._parsed = woothee.parse(ua);
    }
    original() {
        return this._ua;
    }
    deviceType() {
        if (this.isFromTablet()) {
            // if (
            //     window &&
            //     window.location &&
            //     [ 'apstaging.foyr.com','neostaging.foyr.com', 'neopreprod.foyr.com', 'asianpaints.foyr.com', "localhost:3000" ].includes( window.location.host )
            // ) {
            //     return "pc"
            // } else {
            //     return "Tablet"
            // }

            return "pc"
        }
        return this._parsed.category;
    }
    getActualDeviceType() {
        if (this.isFromTablet()) {
            return "tablet"
        }
        return this._parsed.category;
    }
    os() {
        return this._parsed.os;
    }
    osVersion() {
        return this._parsed.os_version;
    }
    browser() {
        return this._parsed.name;
    }
    browserVersion() {
        return this._parsed.version;
    }
    browserVendor() {
        return this._parsed.vendor;
    }
    isFromIphone() {
        return this.os() === "iPhone";
    }
    isFromIpad() {
        if ( this.os() === "iPad" ) return true
        else if (typeof navigator !== "undefined") {
            return navigator.maxTouchPoints &&
                  navigator.maxTouchPoints > 2 &&
                  this.os() === "Mac OSX";
        }

        return false;
    }
    isFromIpod() {
        return this.os() === "iPod";
    }
    isFromIos() {
        return (this.isFromIphone() ||
            this.isFromIpad() ||
            this.isFromIpod() ||
            this.os() == "iOS");
    }
    isFromAndroidMobile() {
        return this.os() === "Android" && ANDROID_MOBILE.test(this._ua);
    }
    isFromAndroidTablet() {
        return this.os() === "Android" && !ANDROID_MOBILE.test(this._ua);
    }
    isFromAndroidOs() {
        return this.isFromAndroidMobile() || this.isFromAndroidTablet() || this.os() == "Android";
    }
    isFromWindowsPhone() {
        return this.os() === "Windows Phone OS";
    }
    isFromPc() {
        return this.deviceType() === "pc";
    }
    isFromSmartphone() {
        return this.deviceType() === "smartphone" && !this.isFromTablet();
    }
    isFromMobilephone() {
        return this.deviceType() === "mobilephone";
    }
    isFromAppliance() {
        return this.deviceType() === "appliance";
    }
    isFromCrawler() {
        return this.deviceType() === "crawler";
    }
    isFromTablet() {
        return this.isFromIpad() || this.isFromAndroidTablet();
    }
}
export default (ctx, inject) => {
    let userAgent = DEFAULT_USER_AGENT;
    if (typeof ctx.req !== "undefined") {
        userAgent = ctx.req.headers["user-agent"]; // FIXME: Better case handling - 20181125 Shin Ando
    }
    else if (typeof navigator !== "undefined") {
        userAgent = navigator.userAgent;
        // userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15";
    }
    ctx.$ua = new UA(userAgent);
    inject("ua", new UA(userAgent));
};
//# sourceMappingURL=plugin.template.js.map