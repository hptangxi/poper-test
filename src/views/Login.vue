<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { menuList } from '../utils/login'

const router = useRouter()
const form = reactive({
  student_no: '',
  password: ''
})
const showPassword = ref(false)
const showMobileMenu = ref(false)
const activeMobieMenuIndex = ref(-1)
const activeMobileSubMenuIndex = ref('')
const closeMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (!showMobileMenu.value) activeMobieMenuIndex.value = -1
}
const changeMobileSubMenu = (mIndex: number, sIndex: number) => {
  const key = `${mIndex}-${sIndex}`
  activeMobileSubMenuIndex.value = activeMobileSubMenuIndex.value === key ? '' : key
}

const submit = () => {
  router.push('/')
}

const menuContainerRefs: any[] = []
const setMenuContainerRef = (el: any, mIndex: number) => {
  if (el) {
    menuContainerRefs[mIndex] = el
  }
}

const subContainerRefs: any[] = []
const setSubContainerRef = (el: any, mIndex: number, sIndex: number) => {
  if (el) {
    if (!subContainerRefs[mIndex]) subContainerRefs[mIndex] = []
    subContainerRefs[mIndex][sIndex] = el
  }
}

const handleMouseEnterSubMenu = (mIndex: number, sIndex: number) => {
  const item = menuList[mIndex]
  if (item.children) {
    item.children[sIndex]!.showSubMenu = true
  }
  nextTick(() => {
    const subContainerRef = subContainerRefs[mIndex][sIndex]
    const windowWidth =window.innerWidth
    const left = subContainerRef.getBoundingClientRect().left + subContainerRef.clientWidth
    if (left > windowWidth) {
      const menu = menuContainerRefs[mIndex]
      menu.style.marginLeft = `-${left - windowWidth + 16}px`
    }
  })
}

const handleMouseLeaveMenu = (mIndex: number) => {
  const menuRef = menuContainerRefs[mIndex]
  menuRef.style.marginLeft = '-8px'
  menuList[mIndex].showSubMenu = false
}

</script>

<template>
  <div class="relative max-w-full min-h-full p-0 bg-white/93 align-baseline">
    <header class="header h-[44px] md:h-20 w-full flex justify-between items-center self-stretch px-4 :px-10 z-[9999] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] fixed top-0 left-0">
      <a href="https://comiru.jp/">
        <img
          class="md:w-[172px] md:h-10 2-[86px] h-5"
          :src="'./images/logo.png'"
        />
      </a>
      <h1 class="font-bold ml-4 leading-5 text-[#493b32] w-[170px] text-sm max-[990px]:hidden">
        塾専用コミュニケーション &amp;業務管理システム
      </h1>
      <nav
        class="header-nav align-right flex-1"
        :class="{ active: showMobileMenu }"
      >
        <ul class="header-nav-inner header-nav-inner-pc">
          <template
            v-for="(m, mIndex) in menuList"
            :key="mIndex"
          >
            <li v-if="m.href" class="header-menu-item menu-no-more">
              <a :href="m.href">{{ m.name }}</a>
            </li>
            <li
              v-else
              class="header-menu-item menu-more"
              @mouseenter.prevent="m.showSubMenu = true"
              @mouseleave.prevent="handleMouseLeaveMenu(mIndex)"
            >
              <a href="javascript:void(0);">
                {{ m.name }}
                <i class="fa fa-chevron-right arrow-mobile"></i>
                <i class="icon-arrow-bottom arrow-pc"></i>
              </a>
              <div v-if="m.children">
                <Transition name="slide-down">
                  <div class="menu-dropdown" :ref="el => setMenuContainerRef(el, mIndex)" v-if="m.showSubMenu" :style="`height:${40 * m.children.length + 8}px`">
                    <ul class="sub">
                      <li
                        :class="{ 'sub-menu-more': sub.children }"
                        v-for="(sub, sIndex) in m.children"
                        :key="sIndex"
                        @mouseenter="handleMouseEnterSubMenu(mIndex, sIndex)"
                        @mouseleave="sub.showSubMenu = false"
                      >
                        <a :href="sub.href || 'javascript:void(0);'">
                          {{ sub.name }}
                          <i
                            v-if="sub.children"
                            class="fa fa-caret-right arrow-sub"
                            aria-hidden="true"
                          />
                        </a>
                        <Transition name="fade">
                          <div :ref="el => setSubContainerRef(el, mIndex, sIndex)" class="sub-container" v-if="sub.showSubMenu">
                            <ul class="sub-menu">
                              <li
                                v-for="(c, cIndex) in sub.children"
                                :key="cIndex"
                              >
                                <a :href="c.href">
                                  {{ c.name }}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </Transition>
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            </li>
          </template>
          <li class="header-menu-item header-menu-item-mobile">
            <a href="https://comiru.jp/teachers/login">塾講師ログイン</a>
          </li>
        </ul>
        <ul
          class="header-nav-inner header-nav-inner-mobile"
          :class="{ 'expand': activeMobieMenuIndex >= 0 }"
        >
          <template
            v-for="(m, mIndex) in menuList"
            :key="mIndex"
          >
            <li v-if="m.href" class="header-menu-item menu-no-more">
              <a :href="m.href">{{ m.name }}</a>
            </li>
            <li v-else class="header-menu-item menu-more" :class="{ active: activeMobieMenuIndex === mIndex }">
              <a href="javascript:void(0);" @click="activeMobieMenuIndex = mIndex">
                {{ m.name }}
                <i class="fa fa-chevron-right arrow-mobile"></i>
                <i class="icon-arrow-bottom arrow-pc"></i>
              </a>
              <div class="menu-dropdown" v-if="m.children">
                <ul class="sub">
                  <li
                    :class="{
                      'sub-menu-more': sub.children,
                      active: activeMobileSubMenuIndex === `${mIndex}-${sIndex}`
                    }"
                    v-for="(sub, sIndex) in m.children"
                    :key="sIndex"
                  >
                    <a
                      :href="sub.href || 'javascript:void(0);'"
                      @click="changeMobileSubMenu(mIndex, sIndex)"
                    >
                      {{ sub.name }}
                      <i
                        class="fa fa-caret-right arrow-sub"
                        v-if="sub.children"
                        aria-hidden="true"
                      />
                    </a>
                    <div v-if="sub.children">
                      <Transition name="slide-down">
                        <div
                          class="sub-container"
                          v-show="activeMobileSubMenuIndex === `${mIndex}-${sIndex}`"
                          :style="`height:${ 45 * sub.children.length }px`"
                        >
                          <ul class="sub-menu">
                            <li
                              v-for="(c, cIndex) in sub.children"
                              :key="cIndex"
                            >
                              <a :href="c.href">
                                {{ c.name }}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </Transition>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </template>
        </ul>
      </nav>
      <div class="login-btn">
        <a href="https://comiru.jp/teachers/login">
          塾講師ログイン
          <i class="fa fa-chevron-right arrow-mobile"></i>
        </a>
      </div>
      <div class="mobile-menu-wrapper" @click="closeMobileMenu">
        <span class="mobile-menu-icon" :class="{ active: showMobileMenu }">
          <i class="line"></i>
          <i class="line"></i>
          <i class="line"></i>
        </span>
      </div>
    </header>
    <div class="login-body">
      <div class="login-main no-nav">
        <div class="login-title-wrapper">
          <h1>その他の登録</h1>
        </div>
        <div class="login-methods">
          <div class="login-methods-item text-center">
            <p>
              メールアドレス（共通アカウント）で<br>
              ログインする場合はこちら
            </p>
            <a class="yellow-button" href="https://comiru.jp/student/login">
              共通アカウントログイン
            </a>
          </div>
          <div class="login-methods-item text-center">
            <p>
              Comiruをすでに友達に追加済みの方<br>
              以下のアイコンをクリックしてログイン
            </p>
            <a
              class="inline-block w-[36px] h-[36px]"
              href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&amp;client_id=1567784603&amp;redirect_uri=https%3A%2F%2Fcomiru.jp%2Fauth%2Fcheck_social_account%3Fidentity_type%3Dline&amp;state=e43a219b-311a-489a-b5dc-d18c377d1cfb-school-id-1&amp;scope=openid%20profile&amp;bot_prompt=aggressive"
            >
              <img
                class="inline-block w-full"
                :src="'./images/btn_base.png'"
              />
            </a>
          </div>
          <div class="login-methods-item text-center">
            <p>
              ComiruをLINEではじめてお使いの方<br>
              以下のアイコンをクリックして友だち追加
            </p>
            <a
              class="inline-block"
              href="https://line.me/R/ti/p/%40onw0127a"
            >
              <img
                class="h-9"
                border="0"
                src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
              />
            </a>
          </div>
        </div>
        <div class="login-title-wrapper">
          <h1>
            生徒・保護者ログイン
            <span>（スクールポパー）</span>
          </h1>
        </div>
        <p>
          生徒番号とパスワードを入力してログインしてください。
          <span class="text-[larger] text-black">生徒番号</span>
          や
          <span class="text-[larger] text-black">パスワード</span>
          がわからない場合は、教室にお問い合わせください。
        </p>
        <form>
          <div class="form-item">
            <label>
              <input
                type="radio"
                name="role"
                value="parent"
                checked
              /> 保護者
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="subStudent"
              /> 生徒
            </label>
          </div>
          <div class="form-item">
            <label for="student-no" class="form-label">生徒番号</label>
            <input
              v-model="form.student_no"
              type="text"
              name="student_no"
              id="student-no"
              class="form-control"
            />
          </div>
          <div class="form-item">
            <label for="password" class="form-label">パスワード</label>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              id="password"
              class="form-control"
            />
          </div>
          <div class="form-item">
            <label for="show-password" class="form-label">
              <input
                v-model="showPassword"
                type="checkbox"
                id="show-password"
              />
              パスワードを表示
            </label>
          </div>
          <div class="form-item form-btn">
            <button
              type="submit"
              class="submit-btn"
              @click="submit"
            >
              ログインする
            </button>
          </div>
        </form>
        <div>
          <li>
            <a href="https://comiru.jp/students/reset/password">
              パスワードを忘れた方はこちら
            </a>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('../styles/login.css');
</style>
