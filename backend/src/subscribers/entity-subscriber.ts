import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from "typeorm";

@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {

    afterLoad(entity: any, event?: LoadEvent<any>): void | Promise<any> {

        if(entity.user) delete entity.user.password
        
        // console.log("Loaded Entity: ", entity)
    }
}