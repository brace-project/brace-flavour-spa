import {customElement, ka_session_storage, ka_sleep, KaCustomElement, KaHtmlElement, template} from "@kasimirjs/embed";
import {api_call, href, ka_router, KaRoute, router} from "@kasimirjs/app";
import {CurRoute} from "@kasimirjs/app";
import {SourceArticleTable} from "./Comp/SourceArticleTable";


/**
 * Demo of a View Component. It is a regular WebComponent with a template and a route.
 */


// language=html
let html = `
        
<div class="container-fluid" style="">
    <div class="row">
        <div class="col-12" style="">
            <h2>Welcome: [[subscription_id]]</h2>
            
        </div>
    </div>
    <div ka.content="sourceArticleTable">
        
    </div>
    
</div>


`



@customElement("welcome-view")
@KaRoute("welcome", "/static/{subscription_id}")
@template(html)
class IndexPage extends KaCustomElement {

    constructor(public route : CurRoute) {
        super();
        let scope = this.init({
            settingsUrl: "/static/" + "/account-settings",
            subscription_id: ka_router().currentRoute.route_params.subscription_id,
            sourceArticleTable: new SourceArticleTable()
        })
    }

    async connectedCallback(): Promise<void> {
        super.connectedCallback();

        this.scope.threadList = []



    }


    // language=html

}
