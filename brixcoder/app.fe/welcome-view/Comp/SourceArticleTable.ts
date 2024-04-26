import {customElement, KaCustomElement, template} from "@kasimirjs/embed";
import {API} from "../../_routes.js";
import {api_call, ka_router} from "@kasimirjs/app";

// Import the Style
import "./_source-article-table.scss";


// language=html
let html = `

    <div>Search: <input type="text" ka.bind="$scope.search">
    <table class="table source-article-table">
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Date</th>
            <th scope="col">Source</th>
        </tr>
        </thead>
        <tbody>
        <tr ka.for="let article of threadList">
            <td>[[article.ID]]</td>
            <td>[[article.Type]]</td>
            <td>[[article.Format]]</td>
            <td>[[article.source]]</td>
        </tr>
        </tbody>
    </table>
    </div>
`;


@customElement("source-article-table")
@template(html)
export class SourceArticleTable extends KaCustomElement {


    constructor() {
        super();
        let scope = this.init({
            settingsUrl: "/static/" + "/account-settings",
            threadList: null,
            search: "",
            $on: {
                change: async () => {
                    console.log("change", this.scope.search);
                    this.reload(this.scope.search);
                }

            }
        })
    }


    public async reload(query : string = null) {
        let params = {subscription_id: ka_router().currentRoute.route_params.subscription_id}
        if (query && query !== "") {
            params["q"] = query
        }
        this.scope.threadList = await api_call(API.listArticles_GET, params)
    }

    async connectedCallback(): Promise<void> {
        super.connectedCallback();

        this.reload();

    }

}
