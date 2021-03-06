import { EntityRepository, Repository, getManager } from "typeorm";
import ArticleEntity from "@/entity/article";
import article from "@/api/routes/article";

@EntityRepository(ArticleEntity)
class ArticleRepository extends Repository<ArticleEntity> {
  async findArticleByDate(date: string) {
    const myquery = `select * from article where Date(date)='${date}'`;
    const articles = getManager().query(myquery);
    return articles;
  }

  async findByIdx(idx: number) {
    const article = await this.findOne({ where: { idx } });
    return article;
  }

  async findAll() {
    const articles = await this.find({
      select: ["company", "category"],
    });
    return articles;
  }

  async search(
    title: any,
    startDate: any,
    endDate: any,
    newspaper: string[],
    category: string[],
    keyword: string[]
  ) {
    let myquery = `select * from article where (DATE(date) BETWEEN '${startDate}' AND '${endDate}')`;

    if (title) {
      myquery += ` AND (title like '%${title}%')`;
    }

    if (newspaper.length) {
      myquery += ` AND (`;
    }

    if (newspaper.length) {
      newspaper.forEach((item, index) => {
        if (index !== 0) {
          myquery += ` OR company='${item}'`;
        } else {
          myquery += `company='${item}'`;
        }
      });
      myquery += `)`;
    }

    if (category.length) {
      myquery += ` AND (`;
    }

    if (category.length) {
      category.forEach((item, index) => {
        if (index !== 0) {
          myquery += ` OR category='${item}'`;
        } else {
          myquery += `category='${item}'`;
        }
      });
      myquery += `)`;
    }

    if (keyword.length && keyword[0] !== "") {
      myquery += ` AND (`;
    }

    if (keyword.length && keyword[0] !== "") {
      keyword.forEach((item, index) => {
        if (index !== 0) {
          myquery += ` OR keywords like '%${item}%'`;
        } else {
          myquery += `keywords like '%${item}%'`;
        }
      });
      myquery += `)`;
    }

    const articles = getManager().query(myquery);
    return articles;
  }

  async getSubscribe(keyword: string[]) {
    if (!keyword.length) {
      return [];
    }

    let myquery = `select * from article where `;

    keyword.forEach((item, index) => {
      if (index !== 0) {
        myquery += ` OR keywords like '%${item}%'`;
      } else {
        myquery += `keywords like '%${item}%'`;
      }
    });

    const articles = getManager().query(myquery);
    return articles;
  }

  async getRecommend(articles: string[]) {
    const temp = [] as any;
    articles.forEach((item) => {
      temp.push({ idx: item });
    });

    const recommends = await this.find({
      select: ["recommend"],
      where: temp,
    });
    const ret = [] as any;
    recommends.forEach((item) => {
      ret.push(item.recommend);
    });
    return ret;
  }

  async findall(articles: number[]) {
    const temp = [] as any;
    articles.forEach((item) => {
      temp.push({ idx: item });
    });

    const result = await this.find({
      where: temp,
    });

    return result;
  }
}

export default ArticleRepository;
