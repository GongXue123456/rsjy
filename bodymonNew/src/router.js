import React from 'react'
import {HashRouter, Route, Switch} from "react-router-dom"
import App from './App'
import Login from './pages/login'
import Admin from './pages/admin'

import Home from './pages/home'
import UserAdd from './pages/home/add'
import UserEdit from './pages/home/edit'

import Body from './pages/body'
import BodyAdd from './pages/body/add'
import BodyEdit from './pages/body/edit'

import Material from './pages/material'
import MaterialAdd from './pages/material/add'
import MaterialEdit from './pages/material/edit'

import Ask from './pages/ask'
import AskAdd from './pages/ask/add'
import AskEdit from './pages/ask/edit'

import Remind from './pages/remind'
import RemindAdd from './pages/remind/add'
import RemindEdit from './pages/remind/edit'

import ScoreLevel from './pages/scoreLevel'
import ScoreLevelAdd from './pages/scoreLevel/add'
import ScoreLevelEdit from './pages/scoreLevel/edit'

import ScoreType from './pages/scoreType'
import ScoreTypeAdd from './pages/scoreType/add'
import ScoreTypeEdit from './pages/scoreType/edit'

import ScoreManage from './pages/scoreManage'
import ScoreManageAdd from './pages/scoreManage/add'
import ScoreManageEdit from './pages/scoreManage/edit'

import MonTempletCategory from './pages/monTempletCategory'
import MonTempletCategoryAdd from './pages/monTempletCategory/add'
import MonTempletCategoryEdit from './pages/monTempletCategory/edit'

import MonTemplet from './pages/monTemplet'
import MonTempletAdd from './pages/monTemplet/add'
import MonTempletEdit from './pages/monTemplet/edit'

import MonTempletResult from './pages/monTempletResult'
import MonTempletResultAdd from './pages/monTempletResult/add'
import MonTempletResultEdit from './pages/monTempletResult/edit'

import MonTempletTitle from './pages/monTempletTitle'
import MonTempletTitleAdd from './pages/monTempletTitle/add'
import MonTempletTitleEdit from './pages/monTempletTitle/edit'

import Device from './pages/device'
import DeviceAdd from './pages/device/add'
import DeviceEdit from './pages/device/edit'


import Task from './pages/task'
import TaskAdd from './pages/task/add'
import TaskEdit from './pages/task/edit'

import Message from './pages/message'

import Range from './pages/echart/range'

// import NoMatch from './pages/404'

class ERouter extends React.Component{
  render () {
    return(
      <App>
        <HashRouter>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path='/home/user/index' component={Home} />
                                    <Route path='/home/user/userAdd' component={UserAdd} />
                                    <Route path='/home/user/userEdit/:id' component={UserEdit} />

                                    <Route path='/body/body/index' component={Body} />
                                    <Route path='/body/body/bodyAdd' component={BodyAdd} />
                                    <Route path='/body/body/bodyEdit/:id' component={BodyEdit} />

                                    <Route path='/task/material/index' component={Material} />
                                    <Route path='/task/material/materialAdd' component={MaterialAdd} />
                                    <Route path='/task/material/materialEdit/:id' component={MaterialEdit} />

                                    <Route path='/task/ontask/index' component={Task} />
                                    <Route path='/task/ontask/taskAdd' component={TaskAdd} />
                                    <Route path='/task/ontask/taskEdit/:id' component={TaskEdit} />

                                    <Route path='/ask/onask/index' component={Ask} />
                                    <Route path='/ask/onask/askAdd' component={AskAdd} />
                                    <Route path='/ask/onask/askEdit/:id' component={AskEdit} />

                                    <Route path='/ask/remind/index' component={Remind} />
                                    <Route path='/ask/remind/remindAdd' component={RemindAdd} />
                                    <Route path='/ask/remind/remindEdit/:id' component={RemindEdit} />

                                    <Route path='/score/index' component={ScoreLevel} />
                                    <Route path='/score/scoreAdd' component={ScoreLevelAdd} />
                                    <Route path='/score/scoreEdit/:id' component={ScoreLevelEdit} />

                                    <Route path='/ask/scoreType/index' component={ScoreType} />
                                    <Route path='/ask/scoreType/scoreTypeAdd' component={ScoreTypeAdd} />
                                    <Route path='/ask/scoreType/scoreTypeEdit/:id' component={ScoreTypeEdit} />

                                    <Route path='/scoreManage/scoreManage/index' component={ScoreManage} />
                                    <Route path='/scoreManage/scoreManage/scoreManageAdd' component={ScoreManageAdd} />
                                    <Route path='/scoreManage/scoreManage/scoreManageEdit/:id' component={ScoreManageEdit} />
                                   
                                    <Route path='/test/monTempletCategory/index' component={MonTempletCategory} />
                                    <Route path='/test/monTempletCategory/monTempletCategoryAdd' component={MonTempletCategoryAdd} />
                                    <Route path='/test/monTempletCategory/monTempletCategoryEdit/:id' component={MonTempletCategoryEdit} />
                                  
                                    <Route path='/test/monTemplet/index' component={MonTemplet} />
                                    <Route path='/test/monTemplet/monTempletAdd' component={MonTempletAdd} />
                                    <Route path='/test/monTemplet/monTempletEdit/:id' component={MonTempletEdit} />
                                   
                                    <Route path='/test/monTemplet/monTempletResult/index/:id' component={MonTempletResult} />
                                    <Route path='/test/monTemplet/monTempletResult/monTempletResultAdd/:id' component={MonTempletResultAdd} />
                                    <Route path='/test/monTemplet/monTempletResult/monTempletResultEdit/:id' component={MonTempletResultEdit} />
                                    
                                    <Route path='/test/monTemplet/monTempletTitle/index/:id' component={MonTempletTitle} />
                                    <Route path='/test/monTemplet/monTempletTitle/monTempletTitleAdd/:id' component={MonTempletTitleAdd} />
                                    <Route path='/test/monTemplet/monTempletTitle/monTempletTitleEdit/:id' component={MonTempletTitleEdit} />

                                    <Route path='/device/manage/index' component={Device} />
                                    <Route path='/device/manage/deviceAdd' component={DeviceAdd} />
                                    <Route path='/device/manage/deviceEdit/:id' component={DeviceEdit} />

                                    <Route path='/echart/range' component={Range} />

                                    <Route path='/message' component={Message} />

                                    <Route component={Home} />
                                </Switch>
                            </Admin>         
                        } />
          </Switch>
                        
        </HashRouter>
      </App>
    )
  }
}

export default ERouter