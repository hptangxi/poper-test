const countries = [
  'Argentina',
  'Australia',
  'Canada',
  'China',
  'Egypt',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan'
]

export type NewsItem = {
  title: string
  date: string
  image: string,
  desc: string
}

export const getNewsList = (count: number): NewsItem[] => {
  const newsArr: NewsItem[] = []
  const usedTitles = new Set()

  while (newsArr.length < count) {
    const randomIndex = Math.floor(Math.random() * countries.length)
    const randomNumber = Math.floor(10000 + Math.random() * 90000)
    const title = `${countries[randomIndex]} has ${ randomNumber } news`

    if (!usedTitles.has(title)) {
      usedTitles.add(title)
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() - newsArr.length)

      newsArr.push({
        title,
        date: currentDate.toISOString().slice(0, 10),
        image: `news_${randomIndex}.jpeg`,
        desc: 'An approachable, performant and versatile framework for building web user interfaces. Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class documentation. Truly reactive, compiler-optimized rendering system that rarely requires manual optimization.'
      })
    }
  }

  return newsArr
}
