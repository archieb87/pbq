/*
 * Test ad manager
 */

OO.Ads.manager(function(_, $) {
  var AdManager = function() {
    this.name = "test-ads-manager";
    this.amc = null;
    this.ready = true;

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

    this.buildTimeline = function() {
      // test ads go here
      return [
        new this.amc.Ad(this.baseAd(0, 4, this.amc.ADTYPE.LINEAR_VIDEO)),
        new this.amc.Ad(this.baseAd(0, 5, this.amc.ADTYPE.NONLINEAR_OVERLAY)),
        new this.amc.Ad(this.baseAd(10, 4, this.amc.ADTYPE.LINEAR_VIDEO)),
        new this.amc.Ad(this.baseAd(2000000000, 3, this.amc.ADTYPE.LINEAR_VIDEO)),
      ];
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

    this.loadMetadata = function() {
      this.ready = true;
    };
    //this.registerUi = function() {};
    this.cancelAd = function() {};
    this.destroy = function() {};
  }
  return new AdManager();
});
