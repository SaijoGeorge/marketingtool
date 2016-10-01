'use strict'

class URLResult {
    constructor() {
        this.facebook_shares_count = document.querySelector('.facebook_shares_count')
        this.google_shares_count = document.querySelector('.google_shares_count')
        this.stumbleupon_shares_count = document.querySelector('.stumbleupon_shares_count')
        this.odnoklassniki_shares_count = document.querySelector('.odnoklassniki_shares_count')
        this.facebook_comments_count = document.querySelector('.facebook_comments_count')
        this.linkedin_shares_count = document.querySelector('.linkedin_shares_count')
        this.buffer_shares_count = document.querySelector('.buffer_shares_count')
        this.mailru_shares_count = document.querySelector('.mailru_shares_count')
        this.facebook_likes_count = document.querySelector('.facebook_likes_count')
        this.pinterest_shares_count = document.querySelector('.pinterest_shares_count')
        this.reddit_shares_count = document.querySelector('.reddit_shares_count')
        this.vkontakte_shares_count = document.querySelector('.vkontakte_shares_count')
        this.twitter_shares_count = document.querySelector('.twitter_count')

        this.bulkSection = document.querySelector('#bulk-section')

        this._getMarketingScore = this._getMarketingScore.bind(this)
        this._createBulkChildElement = this._createBulkChildElement.bind(this)
        this._updateCount = this._updateCount.bind(this)
        this._updateBulkCount = this._updateBulkCount.bind(this)
    }

    _getMarketingScore(data){
        var class1_perc = 50
        var class2_perc = 30
        var class3_perc = 20
        var class1_share_count = parseFloat(data.facebook_share) + parseFloat(data.google) + parseFloat(data.twitter) + parseFloat(data.linkedin)
        var class2_share_count = parseFloat(data.reddit) + parseFloat(data.pinterest) + parseFloat(data.buffer)
        var class3_share_count = parseFloat(data.stumbleupon) + parseFloat(data.odnoklassniki) + parseFloat(data.mail_ru) + parseFloat(data.vkontakte)
        var score = 0

        if(class1_share_count >= 10000){
          score = score + class1_perc
        } else if(class1_share_count < 10000 && class1_share_count >= 100){
          score = score + (class1_share_count / 10000) * class1_perc
        } else{
          score = score + 0
        }

        if(class2_share_count >= 3000){
          score = score + class2_perc
        } else if(class2_share_count < 3000 && class2_share_count >= 10){
          score = score + (class2_share_count / 3000) * class2_perc
        } else{
          score = score + 0
        }

        if(class3_share_count >= 1000){
          score = score + class3_perc
        } else if(class3_share_count < 1000 && class3_share_count >= 10){
          score = score + (class3_share_count / 1000) * class3_perc
        } else{
          score = score + 0
        }

        return score
    }

    _updateCount(data){

      this.facebook_shares_count.innerHTML = data.facebook_share
      this.facebook_comments_count.innerHTML = data.facebook_comment
      this.facebook_likes_count.innerHTML = data.facebook_likes
      this.google_shares_count.innerHTML = data.google
      this.stumbleupon_shares_count.innerHTML = data.stumbleupon
      this.odnoklassniki_shares_count.innerHTML = data.odnoklassniki
      this.linkedin_shares_count.innerHTML = data.linkedin
      this.buffer_shares_count.innerHTML = data.buffer
      this.mailru_shares_count.innerHTML = data.mail_ru
      this.pinterest_shares_count.innerHTML = data.pinterest
      this.reddit_shares_count.innerHTML = data.reddit
      this.vkontakte_shares_count.innerHTML = data.vkontakte
      this.twitter_shares_count.innerHTML = data.twitter

      fbChart([data.facebook_share, data.facebook_comment, data.facebook_likes]);
      allChart([
        data.facebook_share,
        data.facebook_comment,
        data.facebook_likes,
        data.google,
        data.linkedin,
        data.pinterest,
        data.stumbleupon,
        data.buffer,
        data.reddit,
        data.odnoklassniki,
        data.mail_ru,
        data.vkontakte,
        data.twitter
      ]);
      mtChart(this._getMarketingScore(data));
    }

    _updateBulkCount(data){

      var context = this;
      if (this.bulkSection.hasChildNodes())
        this.bulkSection.removeChild(this.bulkSection.firstChild)

      var parentUl = this.bulkSection.appendChild(document.createElement('ul'))
      data.forEach(function(element, index, array) {
        parentUl.appendChild(context._createBulkChildHeaderElement(element))
      });
    }

    _createBulkChildHeaderElement(element){
      var childHeaderLi =  document.createElement('li')
      childHeaderLi.classList.add('c-list__item')

      var childHeaderAnchor = document.createElement('a')
      var childHeaderAnchorSrc = document.createAttribute("href");
      childHeaderAnchorSrc.value = xssFilters.uriInHTMLData(element.url);
      childHeaderAnchor.setAttributeNode(childHeaderAnchorSrc);
      var childHeaderAnchorTarget = document.createAttribute("target");
      childHeaderAnchorTarget.value = '_blank';
      childHeaderAnchor.setAttributeNode(childHeaderAnchorTarget);
      childHeaderAnchor.classList.add('c-list__url')
      var childHeaderAnchorText = document.createTextNode(xssFilters.uriInHTMLData(element.url));
      childHeaderAnchor.appendChild(childHeaderAnchorText)


      childHeaderLi.classList.add('c-list__item')
      var childHeaderUl =  document.createElement('ul')
      childHeaderUl.classList.add('c-list__ul')

      this._createBulkChildElement(element.url, element.facebook_share, 'u-color--facebook', 'images/icons.svg#facebook-shares', 'Facebook shares')
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.facebook_share, 'u-color--facebook', 'images/icons.svg#facebook-shares', 'Facebook shares'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.facebook_comment, 'u-color--facebook', 'images/icons.svg#facebook-comments', 'Facebook comments'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.facebook_likes, 'u-color--facebook', 'images/icons.svg#facebook-likes', 'Facebook likes'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.google, 'u-color--google', 'images/icons.svg#google-plus', 'Google Plus shares'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.linkedin, 'u-color--linkedin', 'images/icons.svg#linkedin', 'Linkedin shares'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.pinterest, 'u-color--pinterest', 'images/icons.svg#pinterest', 'Pinterest'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.stumbleupon, 'u-color--stumbleupon', 'images/icons.svg#stumbleupon', 'Stumbleupon'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.buffer, 'u-color--buffer', 'images/icons.svg#buffer', 'Buffer'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.reddit, 'u-color--reddit', 'images/icons.svg#reddit', 'Reddit'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.odnoklassniki, 'u-color--odnoklassniki', 'images/icons.svg#odnoklassniki', 'Odnoklassniki'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.mail_ru, 'u-color--mailru', 'images/icons.svg#mailru', 'Mail.Ru'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.vkontakte, 'u-color--vkontakte', 'images/icons.svg#vkontakte', 'VKontakte'))
      childHeaderUl.appendChild(this._createBulkChildElement(element.url, element.twitter, 'u-color--twitter', 'images/icons.svg#twitter', 'Twitter'))

      childHeaderLi.appendChild(childHeaderAnchor)
      childHeaderLi.appendChild(childHeaderUl)

      return childHeaderLi
    }

    _createBulkChildElement(url, count, color, svg, tooltip){

      var childFacebook = document.createElement('li')
      var childFacebookToolTip = document.createAttribute('data-tooltip')
      childFacebookToolTip.value = tooltip
      childFacebook.setAttributeNode(childFacebookToolTip);
      childFacebook.classList.add('c-list__li','c-tooltip',color) //u-color--facebook
      var childFacebookSvg = document.createElement('svg')
      childFacebookSvg.classList.add('c-list__icon')
      var childFacebookUse = document.createElement('use')
      //var childFacebookUseXlink= document.createAttributeNS('http://www.w3.org/1999/xlink', 'xlink')
      //childFacebookUseXlink.value = 'testing'
      var childFacebookUseHref = document.createAttributeNS('http://www.w3.org/1999/xlink', 'href')
      childFacebookUseHref.value =  svg //'images/icons.svg#facebook-shares'
      //childFacebookUse.setAttributeNode(childFacebookUseXlink);
      childFacebookUse.setAttributeNode(childFacebookUseHref);
      var childFacebookSpan = document.createElement('span')
      childFacebookSpan.classList.add('c-list__number','js-number')
      var childFacebookSpanText = document.createTextNode(count);
      childFacebookSpan.appendChild(childFacebookSpanText)

      childFacebookSvg.appendChild(childFacebookUse)
      childFacebook.appendChild(childFacebookSvg)
      childFacebook.appendChild(childFacebookSpan)

      return childFacebook

    }

}
