import Link from 'next/link'
import cn from 'clsx'
import { motion } from 'framer-motion'
import Container from '../Container/Container'
import { MENU_ITEMS, CONTENTFUL_CONTENT_TYPE_IDS } from '../../utils/constants'
import styles from './HeroItem.module.scss'

const HeroItem = ({ item }) => {
  const noDimmed = !item.fields.linkText && !item.fields.linkTarget && !item.fields.linkText

  return (
    <motion.div
      className={styles.heroItem}
      style={{
        backgroundImage: `url(${item.fields.image.fields.file.url})`,
      }}
      initial={{ filter: 'blur(5px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      exit={{ filter: 'blur(5px)', opacity: 0 }}
      transition={{
        duration: 1,
      }}
    >
      <div
        className={cn(styles.metaWrapper, {
          [styles.noDimmed]: noDimmed,
        })}
      >
        <Container className={styles.container}>
          <h2>{item.fields.heading}</h2>
          {item.fields.linkText && (
            <>
              {item.fields.linkTarget ? (
                <LinkComponent item={item} />
              ) : (
                <h3>{item.fields.linkText}</h3>
              )}
            </>
          )}
        </Container>
      </div>
    </motion.div>
  )
}

const LinkComponent = ({ item }) => {
  const sectionEntries = MENU_ITEMS.map(({ contentfulContentTypeId }) => contentfulContentTypeId)

  let link
  const { id: contentTypeId } = item.fields.linkTarget.sys.contentType.sys

  // Link goes to a section
  if (sectionEntries.includes(contentTypeId)) {
    link = (
      <Link
        href="/"
        as={MENU_ITEMS.find(menuItem => menuItem.contentfulContentTypeId === contentTypeId)?.slug}
      >
        <a>{item.fields.linkText}</a>
      </Link>
    )
    // Link goes to a news item
  } else if (contentTypeId === CONTENTFUL_CONTENT_TYPE_IDS.newsItem) {
    link = (
      <Link href={`/nyhet/${item.fields.linkTarget.fields.slug}`}>
        <a>{item.fields.linkText}</a>
      </Link>
    )
  }

  return link
}

export default HeroItem
