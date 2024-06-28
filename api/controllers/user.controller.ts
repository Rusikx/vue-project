import { Request, Response, NextFunction } from 'express'

/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param { Request } req	Express HTTP Request
 *	@param { Response } res	Express HTTP Response
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */

export function allAccess(req: Request, res: Response) {
  res.status(200).send("Public Content.")
}

export function userBoard(req: Request, res: Response) {
  res.status(200).send("User Content.")
}

export function adminBoard(req: Request, res: Response) {
  res.status(200).send("Admin Content.")
}

export function moderatorBoard(req: Request, res: Response) {
  res.status(200).send("Moderator Content.")
}