# 创建服务器实现

创建GraphQL服务器
1. 创建数据库代码
`npm install mongoose @types/mongoose --save-dev`

```ts
server/database/Database.ts
import mongoose from "mongoose";

export class Mongo {
  constructor(private url : string = "mongodb://localhost:27017/packt_atp_chapter_05") {
  }

  public Connect(): void {
    mongoose.connect(this.url, { useNewUrlParser: true}, (e:unknown) => {
      if (e) {
        console.log(`Unable to connect ` + e);
      } else {
        console.log(`Connected to the database`);
      }
    });
  } 
}

export type Model = mongoose.Model<mongoose.Document>
```
我们添加一个泛型数据库框架
> 在很大程度上，可以认为unknown类型≈any类型，
> 我们可以为unknown类型的变量赋值任何类型，但不能把它赋值给另外一个类型（除非使用类型断言）
编写一个相对泛型的数据库类。
泛型基类：DataAccessBase
- 接受mongoose.Document作为类型，构造函数接受的模型可以用于各种数据库操作。
具体实现：TodoDataAccess


# 创建一个基本的缓存机制。
当数据库在服务器启动过程中完成加载时，将填充缓存。
预先填充缓存，想在GraphQL和服务器中使用类的同一个实例。我们将创建单例。
# 创建GraphQL类型
通过使用type-graphql和一些方便的装饰器，我们将创建一个架构来代表一个事项。
我们将使用@ObjectType装饰这个类的定义，从而能够创建复杂的类型。
作为优秀的开发人员，提供一个描述，让类型的消费者能够得到一个文档，了解它代表的含义。

TodoItem和TodoItemInput类的目的是提供描述了·字段·，·类型·和·实参·的架构。
它们是我们的Graphql拼图的重要部分。
还有一块拼图，针对GraphQL服务器执行函数的能力。
解析类型的手段，使用GraphQL时，解析器代表单个字段。
它获取我们需要的数据，实际上为GraphQL服务器提供了详细的指令。
告诉他如何把查询转换为数据项。
字段和解析器之间是一对一映射的关系。

创建了解析器和架构之后，我们把注意力转移到添加代码来实际创建GraphQL服务器。

# 使用阿波罗 Apollo Server作为服务器
我们使用Apollo Server来代替Express
因为Apollo提供了自己的Server实现。
`npm install apollo-server apollo-server-express --save`


# GraphQL Angular客户端


# 部署在
[todoitem-tasklist.netlify.app](https://todoitem-tasklist.netlify.app/)
