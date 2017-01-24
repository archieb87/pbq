/*
 * Test ad manager
 */

OO.Ads.manager(function(_, $) {
  var AdManager = function() {
    this.name = "fakeAds";
    this.amc = null;
    this.ready = true;
    var ads = [];

    this.baseAd = function(position, duration, adType) {
      this.adManager = this.name;
      this.position = position;
      this.duration = duration;
      this.adType = adType;
      this.streams = [{"mp4":""}];
      return this;
    }

    this.initialize = function(amc) {
      this.amc = amc;
    };

    this.loadMetadata = function(data) {
      this.ready = true;
      console.log("here");
      if (!data || !data.ads) return;
      for (var key in data.ads) {
        var oneAd = data.ads[key];
        var type = this.amc.ADTYPE.LINEAR_VIDEO;
        switch (oneAd.type) {
          case "nonlinearOverlay":
            type = this.amc.ADTYPE.NONLINEAR_OVERLAY;
            break;
        }
        ads.push(new this.amc.Ad(this.baseAd(oneAd.time, oneAd.duration, type)));
      }
    };

    this.buildTimeline = function() {
      return ads;
    };

    this.playAd = function(ad) {
      if (ad.isLinear) {
        this.amc.notifyPodStarted(ad.id, 1);
        this.amc.notifyLinearAdStarted(ad.id, {});
        setTimeout(_.bind(function(){ this.amc.notifyLinearAdEnded(ad.id) }, this), ad.duration * 1000);
        setTimeout(_.bind(function(){ this.amc.notifyPodEnded(ad.id) }, this), ad.duration * 1000);
      }
      else {
        //this.amc.notifyNonlinearAdStarted(ad.id, {});
        this.amc.sendURLToLoadAndPlayNonLinearAd(ad, ad.id, "http://www.ooyala.com/sites/ooyala.com/files/ooyala_logo_footer.svg");
        setTimeout(_.bind(function(){ this.amc.notifyNonlinearAdEnded(ad.id) }, this), ad.duration * 1000);
      }
    };

    this.cancelAd = function() {};
    this.destroy = function() {};
  }
  return new AdManager();
});
