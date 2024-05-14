import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createBranchDto, updateBranchDto } from "../dtos/branches.dtos";



const router = Router();

router.post("/", authenticate, createBranchDto, BranchController.createBranch);

router.patch("/:id", authenticate, updateBranchDto, BranchController.updateBranch);

router.put("/:id", authenticate, updateBranchDto, BranchController.updateBranch);

router.delete("/:id", authenticate,BranchController.deleteBranch);

router.get("/:id", authenticate, BranchController.getBranchById);

router.get("/", authenticate, BranchController.getBranches);

export default router;