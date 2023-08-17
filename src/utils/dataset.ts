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

const createNewsList = (count: number): NewsItem[] => {
  const newsArr: NewsItem[] = []
  let countryIndex = 0

  while (newsArr.length < count) {
    const title = `${countries[countryIndex]}${ newsArr.length + 1 }`
    countryIndex = countryIndex >= countries.length - 1 ? 0 : countryIndex + 1

    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - newsArr.length)

    newsArr.push({
      title,
      date: currentDate.toISOString().slice(0, 10),
      image: `news_${countryIndex}.jpeg`,
      desc: 'An approachable, performant and versatile framework for building web user interfaces. Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class documentation. Truly reactive, compiler-optimized rendering system that rarely requires manual optimization.'
    })
  }

  return newsArr
}

export const totalList = createNewsList(1000)
