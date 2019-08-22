import { defaultNS } from 'link-lib'
import { Namespace } from 'rdflib'

export const ns = {
  ...defaultNS,
  app: Namespace("http://localhost:8080/")
}
