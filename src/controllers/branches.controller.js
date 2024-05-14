import { validatePage, validatePageSize } from "../utils/httpRequest.utils";



//----------------------------------create------------------------------
export const createBranch = async(req, res) =>{

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    const branch = await BranchService.createBranch(req.body);
    res.status(201).json({branch: branch});
  }catch(error){
    res.status(500).json({error: error.messages});
  }
};

//----------------------------------update------------------------------
export const updateBranch = async (req, res) =>{

  const errors = validationResult(req);

  const {id} = req.params;

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  try{
    const updateBranch = await BranchService.updateBranch(id, req.body);
    if(!updateBranch){
      return res.status(404).json({message: `Branch with ID ${id} was not found.`});
    }

    res.status(200).json({branch: updateBranch});
  }catch (error){
    res.status(500).json({error: error.message});
  }
};
//----------------------------------delete------------------------------
export const deleteBranch = async(req, res) =>{
  const {user} = req;
  const {userId} = user;
  const {id} = req.params;

  try{
    const deleteBranch = await BranchService.deleteBranch(id, userId);
    if(!deleteBranch){
      return res.status(404).json({message: `Entity with ID ${id} was not found.`});
    }
    res.status(200).json({delete :deleteBranch.id});
  }catch (error){
    res.status(500).json({error: error.message});
  }
};
//----------------------------------getId------------------------------
export const getBranchById = async(req, res) =>{
  const {id} = req.params;

  try{
    const branch = await BranchService.getBranchById(id, );

    if(!branch ){
      return res.status(404).json({message: `Entity with ID ${id} was not found.`});
    }
      res.satus(200).json({branch: branch});
  }catch(error){
    res.status(500).json({error: error.message});
  }
};

//----------------------------------get------------------------------

export const  getBranches = async(req, res) =>{
  const {page, pageSize,} = req.query;
  const pageNUm = validatePage(page);
  const pageSizeNum = validatePageSize(pageSize)
  const query = {}

  try{
    const branches = await BranchService.getBranches(pageNUm, pageSizeNum, query);

    if(!branches || branches.length <1){
      return res.satus(404).json({message: "No Branches were found"})
    }
    res.status(200).json({
        status:{
          code:200,
          name: "OK"
        },
        data: branches,
        pageSize: pageSizeNum,
        currentPage: pageNUm,
        totalRecords: await BranchService.getActivateRecordsCount(query)
    });
  }catch (error){
    res.status(500).json({error: error.message});
  }
};
