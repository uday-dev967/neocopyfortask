<template>
    <div class="community-feed-wrapper">
        <div v-if="feed.length" class="section-title">
            {{$t("dashboard.toPosts")}}
        </div>
        <div class="feed-cards-wrapper">
          <div v-for="post of feed" :key="post.data.id" class="card" @click="handleCardClick">
            <div class="author-info-wrapper">
              <div class="author-image image-container">
                <img v-if="post.data.user.bio.userImage" :src="post.data.user.bio.userImage" @error="setAltImg" alt="">
                <div v-else class="image-fallback-wrapper">
                  {{ post.data.user.bio.userName ? post.data.user.bio.userName.split("")[0] : "" }}
                </div>
              </div>
              <div class="author-info">
                <div class="name"> {{ post.data.user.bio.userName }} </div>
                <div
                  v-if="post.data.user.bio.designation || post.data.user.bio.company"
                  class="company"
                >
                  {{ post.data.user.bio.designation }}
                    <span v-if="post.data.user.bio.company">
                      at {{ post.data.user.bio.company }}
                    </span>
                </div>
                <div class="post-date"> {{ getDateToRelTxt(post.data.time) }} </div>
              </div>
            </div>
            <div class="post-content-wrapper">
              <div 
                  v-if="post.data.payload.description"
                  class="post-description"
                  v-html="getSanitizedHtml(post.data.payload.description)"
              ></div>
              <div class="post-image">
                <img v-if="post.data.payload.images && post.data.payload.images.length" :src="post.data.payload.images[0]" alt="">
              </div>
            </div>
            <div class="reaction-counter-wrapper">
              <div class="reaction-counter-item likes-wrapper" :class="{'selected': post.data.reaction_counts.like}">
                <svg data-v-5bf76c14="" fill="none" height="25" viewBox="0 0 24 25" width="24" xmlns="http://www.w3.org/2000/svg"><path data-v-5bf76c14="" d="m20.1744 5.92277c-1.06-1.06279-2.4652-1.71146-3.9616-1.82883-1.4965-.11737-2.9856.3043-4.1984 1.18883-1.2723-.94636-2.85597-1.37549-4.43204-1.20096-1.57608.17453-3.02748.93974-4.06195 2.14155-1.03447 1.2018-1.57515 2.75093-1.51317 4.33544.06198 1.5845.72201 3.0866 1.8472 4.204l6.20996 6.22c.5201.5118 1.2204.7986 1.95.7986s1.43-.2868 1.95-.7986l6.21-6.22c1.1676-1.1748 1.823-2.7638 1.823-4.42 0-1.6563-.6554-3.24529-1.823-4.42003z" fill="#ed737c"></path></svg>
                {{ post.data.reaction_counts.like }}
              </div>
              <div class="reaction-counter-item comments-wrapper" :class="{'selected': post.data.reaction_counts.comment}">
                <svg data-v-5bf76c14="" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path data-v-5bf76c14="" d="m16.944 17.6469-.1465-.1469h-.2075-11.59c-.66304 0-1.29893-.2634-1.76777-.7322-.46884-.4689-.73223-1.1048-.73223-1.7678v-10c0-.66304.26339-1.29893.73223-1.76777s1.10473-.73223 1.76777-.73223h14c.663 0 1.2989.26339 1.7678.73223.4688.46884.7322 1.10473.7322 1.76777v15.9985c-.0007.0983-.0304.1943-.0854.2759-.0551.0819-.1333.1456-.2246.1831l-.0118.0048-.0115.0055c-.048.0226-.1007.0337-.1538.0324l-.0079-.0002h-.0079c-.0658.0004-.131-.0122-.1919-.0371-.0605-.0247-.1156-.0611-.1621-.107-.0004-.0003-.0007-.0006-.001-.0009zm2.7017 1.2959.8543.858v-1.2108-13.59c0-.39782-.158-.77935-.4393-1.06066-.2813-.2813-.6629-.43934-1.0607-.43934h-14c-.39783 0-.77936.15804-1.06066.43934s-.43934.66283-.43934 1.06066v10c0 .3978.15804.7794.43934 1.0607s.66283.4393 1.06066.4393h12 .0029c.0658-.0004.131.0122.1919.0371.0606.0247.1157.0611.1622.107.0003.0003.0006.0006.0009.0009zm-7.9235-9.35854c.0822-.05494.1789-.08426.2778-.08426.1326 0 .2598.05268.3536.14645.0937.09377.1464.22094.1464.35355 0 .0989-.0293.1956-.0843.2778-.0549.0822-.133.1463-.2244.1841-.0913.0379-.1919.0478-.2888.0285-.097-.0193-.1861-.0669-.2561-.1368-.0699-.07-.1175-.1591-.1368-.2561-.0193-.0969-.0094-.19748.0285-.28884.0378-.09136.1019-.16945.1841-.2244zm-3.99999.00001c.08223-.05495.1789-.08427.27779-.08427.13261 0 .25978.05268.35355.14645s.14645.22094.14645.35355c0 .0989-.02932.1956-.08426.2778-.05495.0822-.13304.1463-.2244.1841-.09136.0379-.1919.0478-.28888.0285-.097-.0193-.18609-.0669-.25601-.1368-.06993-.07-.11755-.1591-.13684-.2561-.0193-.0969-.00939-.19748.02845-.28884s.10193-.16945.18415-.22439zm7.99999-.00001c.0822-.05494.1789-.08426.2778-.08426.1326 0 .2598.05268.3536.14645.0937.09376.1464.22094.1464.35355 0 .0989-.0293.1956-.0843.2778-.0549.0822-.133.1463-.2244.1841-.0913.0379-.1919.0478-.2888.0285-.097-.0193-.1861-.0669-.2561-.1368-.0699-.07-.1175-.1591-.1368-.2561-.0193-.0969-.0094-.19748.0285-.28884.0378-.09136.1019-.16945.1841-.2244z" stroke="#0e0e0e"></path></svg>
                {{ post.data.reaction_counts.comment }}
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import fallbackImage from "../../../assets/images/dashboard/feed-user-profile-image-fallback.jpg"
export default {
  name: "CommunityFeed",
  components: {},
  props: {},
  data() {
    return {
      feed: []
    };
  },
  computed: {
    ...mapState({})
  },
  async mounted() {
    const feedResponse = await this.communityFeed();
    if (
      feedResponse &&
      feedResponse.hashtag_feed &&
      feedResponse.hashtag_feed.length
    ) {
      this.feed = feedResponse.hashtag_feed;
    }
  },
  methods: {
    ...mapActions("Community", ["communityFeed"]),
    ...mapMutations({}),
    getDateToRelTxt(d) {
      const userDate = new Date(d);
      const today = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      let dateTxt = "";
      if (userDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        dateTxt = "today";
      } else if (userDate < today) {
        const yday = new Date();
        yday.setDate(yday.getDate() - 1);
        if (userDate === yday) {
          dateTxt = "yesterday";
        } else {
          const diffDays = Math.round(Math.abs((userDate - today) / oneDay));
          dateTxt = diffDays + "d ago";
        }
      }
      return dateTxt;
    },
    getSanitizedHtml(html, clipFlag, maxC, maxL) {
      let clippedHtml = html;
      if (clipFlag) {
        clippedHtml = clip(html, maxC, {
          html: true,
          maxLines: maxL
        });
      }
      // URLs starting with http://, https://, or ftp://
      const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      let replacedText = clippedHtml.replace(
        replacePattern1,
        '<a class="neo_pr_link" href="$1" target="_blank">$1</a>'
      );

      // URLs starting with www. (without // before it, or it'd re-link the ones done above)
      const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a class="neo_pr_link" href="http://$2" target="_blank">$2</a>'
      );

      // Change email addresses to mailto:: links
      const replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
      replacedText = replacedText.replace(
        replacePattern3,
        '<a class="neo_pr_link" href="mailto:$1" target="_blank">$1</a>'
      );
      return this.detectHashtags(replacedText);
    },
    detectHashtags(content) {
      // this.content = html
      return content.replace(
        /(|\s)([#][a-z\d-]+)/gi,
        "$1<span class='neo_pr_hashtag'>$2</span>"
      );
      // older one - /(^|\s)([#@][a-z\d-]+)/gi
      // exp1 - ([@]|[#])([a-z])\w+
    },
    handleCardClick() {
        window.open("https://community.foyr.com/hashtag/foyrdesignchallenge", "_blank");
        window.analytics.track(
            "design_challenge_post_click",
            {
                title: "design_challenge_post_click".toUpperCase().split("_").join(" "),
            },
            {
                integrations: {
                Amplitude: { session_id: new Date().getTime() }
                }
            }
        );
    },
    setAltImg(event) { 
      // event.target.src = fallbackImage;
    }
  }
};
</script>
<style lang="scss" scoped>
.community-feed-wrapper {
  padding: 0 5.25rem 2rem 5.25rem;
  .section-title {
    font-family: $main-font;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    color: $banner-sub-heading-color;
    margin-bottom: 1.3rem;
  }

  // .feed-cards-wrapper {
  //   display: grid;
  //   gap: 1rem;
  //   grid-auto-columns: 25%;
  //   grid-auto-flow: column;
  // }

  .feed-cards-wrapper {
    display: grid;
    grid-template-columns: repeat(4, minmax(25%, 1fr));
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px #00000023;
    border-radius: 8px;
    // background-color: bisque;
    padding: 12px;
    cursor: pointer;

    .author-info-wrapper {
      display: flex;
      align-items: flex-start;

      .author-image {
        margin-right: 1rem;
        overflow: hidden;
        border-radius: 5000px;
        min-width: 4rem;

        img {
          display: block;
          height: 4rem;
          width: 4rem;
          object-position: top;
          object-fit: cover;
        }

        .image-fallback-wrapper {
          background-color: $color-second;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 4rem;
          width: 4rem;
          color: #232121;
          text-align: center;
          font-size: 1.5rem;
          border-radius: 50%;
          text-transform: uppercase;
        }
      }

      .author-info {
        margin-bottom: 1.25rem;
        flex-grow: 1;

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          text-transform: capitalize;
          max-width: 98%;
          font-style: normal;
          font-weight: bold;
          color: #111;
          text-align: left;
          font-size: 1.25em;
          word-break: break-word;
        }

        .company,
        .post-date {
          overflow: hidden;
          // width: 100%;
          padding-right: 8px;
          margin-right: 8px;
          font-style: normal;
          font-weight: normal;
          font-size: 0.75em;
          color: #3a393a;
          text-align: left;
          overflow-wrap: anywhere;
          text-overflow: ellipsis;
          line-height: 1.5em;
          max-height: 1.5em;
        }
      }
    }

    .post-content-wrapper {
      flex-grow: 1;
      margin-top: 0.5rem;
      .post-description {
        margin: 0px;
        min-height: 3rem;
        max-height: 3rem;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }

      .post-image {
        margin-top: 1rem;
        min-width: 100%;
        max-width: 100%;
        height: 10.5rem;
        min-height: 10.5rem;
        overflow: hidden;
        border-radius: 8px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }

    .reaction-counter-wrapper {
      margin-top: 1rem;
      display: flex;

      .reaction-counter-item {
        display: flex;
        align-items: center;

        &:not(:last-child) {
          margin-right: 1rem;
        }
        svg {
          height: 1.5rem;
          width: 1.5rem;
          margin-right: 0.5rem;
          padding: 0.1875rem;
          border-radius: 50%;
        }
      }
      .likes-wrapper {
        svg {
          background-color: #fadcde;
        }

        &.selected {
          svg {
            path {
              fill: #e8505b;
            }
          }
        }
      }
      .comments-wrapper {
        svg {
          background-color: #cdf3e2;
        }

        // &.selected {
        //   svg {
        //     path {
        //       fill: #e8505b;
        //     }
        //   }
        // }
      }
    }
  }
}
</style>

<style lang="scss">
.community-feed-wrapper {
  .card {
    .post-content-wrapper {
      .post-description {
        p {
          margin: 0;
          padding: 0;
          font-size: 0.75rem;
          line-height: 1rem;
          color: #232121;

          span,
          .neo_pr_hashtag {
            font-size: 0.75rem;
            color: #1b74f9;
            cursor: pointer;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
