const dashboardRoles = {
  monitor: {
    title: "班长后台",
    theme: "dark",
    dashboard: "admin-monitor-dashboard.html",
    files: ["monitor-diary", "monitor-chat", "absence-correction"]
  },
  art: {
    title: "美术委员后台",
    theme: "dark",
    dashboard: "admin-art-dashboard.html",
    files: ["art-diary", "soul-return-ritual"]
  },
  sports: {
    title: "体育委员后台",
    theme: "dark",
    dashboard: "admin-sports-dashboard.html",
    files: ["hospital-report", "sports-info-removal", "sports-familiar-self"]
  },
  info: {
    title: "信息委员后台",
    theme: "dark",
    dashboard: "admin-info-dashboard.html",
    files: ["info-diary-01", "info-diary-02", "info-diary-03"]
  }
};

const fileRecords = {
  "monitor-diary": {
    title: "班长日记",
    html: `
      <article class="role-diary-paper">
        <p><strong>仪式是真的</strong>。</p>
        <p>林媛消失了，真他妈邪门，好消息是，我能感觉到我的<strong>愿望</strong>被实现了，其他人也有同样的感觉，即便我们都没有说出口，但是似乎愿望本身并不需要已语言的形式表达</p>
        <p>许知夏还在那里装的跟真事儿似的，要是把她一块儿献祭了就好了。她的那点小心思我还不知道，她那个哈希加密程序从创建账号的时候就留在后台里了。只要她有小动作，我就让高远把她宰喽</p>
        <p class="diary-red-fragment">但是林媛是谁</p>
        <div class="diary-copy-cipher">
          <p class="diary-red-fragment diary-cipher-noise">林媛是谁林媛是谁林媛是谁<span class="cipher-scrap scrap-flower">窗下的花朵</span>林媛是谁林媛是谁林媛是谁林媛是谁<span class="cipher-scrap scrap-have">有</span>林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁</p>
          <p class="diary-red-fragment diary-cipher-noise">林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁<span class="cipher-scrap scrap-star">教室里的星星</span>林媛是谁林媛是谁林媛是谁<span class="cipher-scrap scrap-how">几</span>林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁</p>
          <p class="diary-red-fragment diary-cipher-noise">林媛是谁<span class="cipher-scrap scrap-life">逝去的生命</span>林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁<span class="cipher-scrap scrap-tyrant">冷血的暴君</span>林媛是谁林媛是谁<span class="cipher-scrap scrap-many">个</span>林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁林媛是谁</p>
        </div>
      </article>
    `
  },
  "monitor-chat": {
    title: "信息委员聊天记录",
    html: `
      <figure class="chat-screenshot" aria-label="班长与信息委员的聊天记录">
        <figcaption>恢复文件：monitor_info_chat_20201026.log</figcaption>
        <div class="chat-window">
          <div class="chat-titlebar">
            <span>后台私信 / 已恢复片段</span>
          </div>
          <div class="chat-message chat-right">
            <strong>许知夏<span class="chat-user-id">quietarchive</span></strong>
            <p>班长，为什么我没有关于林媛的记忆了</p>
          </div>
          <div class="chat-message chat-left">
            <strong>梁致远<span class="chat-user-id">admin-07</span></strong>
            <p>林媛是谁？</p>
          </div>
          <div class="chat-message chat-right">
            <strong>许知夏<span class="chat-user-id">quietarchive</span></strong>
            <p>我知道是你搞的鬼</p>
          </div>
          <div class="chat-message chat-right">
            <strong>许知夏<span class="chat-user-id">quietarchive</span></strong>
            <p>我说话啊</p>
          </div>
          <div class="chat-message chat-right">
            <strong>许知夏<span class="chat-user-id">quietarchive</span></strong>
            <p>别逼我去找你</p>
          </div>
        </div>
      </figure>
    `
  },
  "absence-correction": {
    title: "缺席名单修正",
    html: `
      <dl class="role-file-change-list">
        <dt>修改日期</dt>
        <dd>2016-07-09</dd>
        <dt>修改账号</dt>
        <dd>admin-07</dd>
        <dt>修改内容</dt>
        <dd>已成功从学生名单中移除：林缘</dd>
      </dl>
    `
  },
  "soul-return-ritual": {
    title: "奥摩耶他返魂仪式详解",
    html: `
      <article class="role-ritual-document" data-ritual-completion>
        <h2>奥摩耶他返魂仪式</h2>
        <div class="ritual-committee-watermark" aria-hidden="true">
          <svg viewBox="0 0 300 300" role="img">
            <defs><path id="returnWatermarkPath" d="M 34,150 A 116,116 0 1,1 266,150 A 116,116 0 1,1 34,150"></path></defs>
            <circle class="watermark-ring-outer" cx="150" cy="150" r="132"></circle>
            <circle class="watermark-ring-inner" cx="150" cy="150" r="103"></circle>
            <text class="watermark-ring-text"><textPath href="#returnWatermarkPath" startOffset="8%">由赫伊希尔委员会修正　·　由赫伊希尔委员会修正　·　</textPath></text>
            <path class="watermark-eye" d="M65 151 Q150 78 235 151 Q150 224 65 151Z"></path>
            <circle class="watermark-iris" cx="150" cy="151" r="42"></circle>
            <circle class="watermark-pupil" cx="150" cy="151" r="18"></circle>
            <circle class="watermark-glint" cx="137" cy="137" r="7"></circle>
          </svg>
        </div>
        <p class="ritual-document-preface">本仪式为奥摩耶他降魂仪式之反转仪式，用于取回先前被献祭者的灵魂。返魂并非撤销代价，而是以新的祭品完成等价交换。执行者必须完整知晓原仪式的参与名单，并在开始前阅读全部条目。</p>
        <section>
          <h3>时间</h3>
          <p><strong>原仪式完成之日的周年夜，子时至丑时之间。</strong></p>
          <p>太阳必须完全缺席，月光不得直接照入仪式场所。返魂须在第一声钟响后开始，并在最后一支蜡烛燃尽前完成；错过时限者应等待下一次周年夜。</p>
        </section>
        <section>
          <h3>地点</h3>
          <p>返魂必须在<strong>最初献祭发生之处</strong>进行。符咒中心应与原被献祭者最后停留的位置重合，门窗全部关闭，现场不得有未参与原仪式者旁观。</p>
          <p>若原地点已经损毁、改建或无法辨认，不得以相似地点代替。错误的地点只会唤回不属于被献祭者的东西。</p>
        </section>
        <section>
          <h3>准备与代价</h3>
          <p><strong>一、原仪式全部参与者的灵魂。</strong></p>
          <p><strong>二、原被献祭者遗留之物一件。</strong></p>
          <p><strong>三、倒置的奥摩耶他符咒一份。</strong></p>
          <p>全部参与者的灵魂将被同时献出，以此换回被献祭者完整的灵魂。无论参与者在原仪式中获得了什么、是否仍记得仪式、是否自愿返还，均不影响代价的收取。</p>
        </section>
        <section>
          <h3>特例：被神明抛弃者</h3>
          <p>原仪式中<strong>未被神明接受、愿望未被实现之人，不属于仪式参与者</strong>。此人已被神明遗忘，其灵魂不在返魂所需的祭品之列。</p>
          <p>执行返魂时，无须也不得献出被抛弃者的灵魂。将其强行写入名单可能使返还的灵魂出现缺损。</p>
        </section>
        <section>
          <h3>仪式步骤</h3>
          <p>将遗留之物置于倒置符咒正中，依原仪式站位写下全部有效参与者的姓名。施法者最后进入符咒，在钟声停止前依次抹去姓名，使其灵魂归入中心祭品。</p>
          <p>当全部姓名消失后，施法者应呼唤被献祭者的姓名三次。不得回答符咒外传来的声音，也不得在被献祭者睁眼前离开原位。</p>
        </section>
        <section>
          <h3>结果与施法者的愿望</h3>
          <p>交换完成后，被献祭者的灵魂将被带回，并重新归于其原本的身体。若身体已不复存在，灵魂会选择与其联系最深的可容之物。</p>
          <p>作为完成返魂的见证者，<strong>施法者可在被献祭者复活的同时实现一个愿望</strong>。愿望不需要说出口；奥摩耶他读取的仍是施法者灵魂最深处的欲望。</p>
          <p>愿望一经读取，不可撤回。返魂完成后，所有作为代价献出的灵魂亦不可再次取回。</p>
        </section>
        <a class="ritual-reversal-button" href="23-true-ending.html">做好准备，进行逆转仪式</a>
      </article>
    `
  },
  "shadow-exchange-ritual": {
    title: "奥摩耶他降魂仪式详解",
    html: `
      <article class="role-ritual-document">
        <h2>奥摩耶他降魂仪式</h2>
        <div class="ritual-committee-watermark" aria-hidden="true">
          <svg viewBox="0 0 300 300" role="img">
            <defs>
              <path id="committeeWatermarkPath" d="M 34,150 A 116,116 0 1,1 266,150 A 116,116 0 1,1 34,150"></path>
            </defs>
            <circle class="watermark-ring-outer" cx="150" cy="150" r="132"></circle>
            <circle class="watermark-ring-inner" cx="150" cy="150" r="103"></circle>
            <text class="watermark-ring-text">
              <textPath href="#committeeWatermarkPath" startOffset="8%">由赫伊希尔委员会修正　·　由赫伊希尔委员会修正　·　</textPath>
            </text>
            <path class="watermark-eye" d="M65 151 Q150 78 235 151 Q150 224 65 151Z"></path>
            <circle class="watermark-iris" cx="150" cy="151" r="42"></circle>
            <circle class="watermark-pupil" cx="150" cy="151" r="18"></circle>
            <circle class="watermark-glint" cx="137" cy="137" r="7"></circle>
          </svg>
        </div>
        <p class="ritual-document-preface">本仪式用于向奥摩耶他呈交灵魂，并使全部仪式参与者取得陈述欲望的权利。仪式一经开始，不得任意中止、转移或更换被献祭者。执行前请完整阅读下列条目。</p>
        <section>
          <h3>时间</h3>
          <p><strong>太阳缺席之时。</strong></p>
          <p>仪式不得在太阳仍可被目视、或其余晖尚未完全消退时进行。满月必须自仪式开始直至结束持续见证全部过程。</p>
        </section>
        <section>
          <h3>地点</h3>
          <p>仪式地点必须处于<strong>海平面以上七百五十米</strong>的高度，并能够接受满月的完整照射。仪式场所应有飞蛾停留，以其作为边界与灵魂之间的守护者。</p>
          <p>若仪式高度低于海平面以上七百五十米，可能引发海的愤怒。为了消解浪潮的不安情绪，请参考<strong>《托尔法典》第七十五页</strong>所载安抚与补救条目。</p>
        </section>
        <section>
          <h3>准备工作</h3>
          <p><strong>一、被献祭者的灵魂，一份。</strong></p>
          <p><strong>二、奥摩耶他符咒，一份。</strong></p>
          <p>符咒必须在仪式开始前完整铺设，不得存在缺口、重描或被外物遮挡的部分。被献祭者及其灵魂应被视为同一份祭品，不得拆分计数。</p>
        </section>
        <section>
          <h3>仪式步骤与限制</h3>
          <p>被献祭者必须处于奥摩耶他符咒的正中间。施法期间，被献祭者的身体与灵魂均不得离开符咒边界；任何形式的拖拽、移动、替换或自行离开，均视为仪式异常。</p>
          <p>确认满月仍在见证、飞蛾仍在守护且符咒边界完整后，方可开始施法。施法者应维持仪式，直至全部参与者的欲望被确认接纳。</p>
          <p>若仪式期间出现符咒破损、飞蛾离去、月光中断、祭品越界或其他无法解释的情况，请立即参考<strong>《托尔法典》第七十五页</strong>，不得依照个人判断擅自修正。</p>
        </section>
        <section>
          <h3>结果</h3>
          <p>参与仪式的所有人，包括被献祭者，均有权提出自己的欲望。此处所称欲望并非口头之语，也不以书写、手势或任何外在表达为必要条件；仪式所读取的，是隐藏在灵魂栖息之所的、最为深沉的愿望。</p>
          <p>仪式完成后，愿望将被自动实现，不论其内容为何，亦不因提出者的身份、立场或是否理解其后果而改变。</p>
          <p>若愿望未被实现，则说明提出者已经被众神遗忘。发生此情形时，请求助于图书管理员或所信任之人，并尽快进行净化仪式。净化仪式的准备与执行方法，请参考<strong>《托尔法典》第九十九页</strong>。</p>
        </section>
      </article>
    `
  },
  "art-profile": {
    title: "个人简介",
    html: `
      <figure class="role-file-photo">
        <img src="../lin-ruoxuan.png" alt="林若萱公开资料照片">
        <figcaption>林若萱第六次举办个人画展</figcaption>
      </figure>
      <p>林若萱，出生于折棠市，中国青年艺术家。公开资料显示，她早年在折棠市第六中学就读，并曾担任班级美术委员，后以个人绘画创作进入公众视野。</p>
      <p>其作品常被评论为具有强烈的层次感与象征性，题材多与记忆、空间和人物关系有关。2020年后，关于林若萱的公开活动记录明显减少。</p>
      <p>公开访谈中，林若萱曾提到中学阶段对色彩和图案的兴趣较早形成。相关同学录资料也显示，她在班级活动中经常负责海报、装饰和活动素材。</p>
    `
  },
  "art-news": {
    title: "入院新闻",
    html: `
      <figure class="role-file-photo">
        <img src="../lin-ruoxuan-ambulance-cn-final.png" alt="医护人员将林若萱送上救护车的现场照片">
        <figcaption>现场流出的照片显示，医护人员正将林若萱送上救护车。</figcaption>
      </figure>
      <p>青年画家林若萱在工作室突发意外，疑似因长期接触污染颜料导致中毒昏迷。目前林若萱仍在医院接受治疗。</p>
      <p>院方暂时没有给出准确答复。知情人士称，林若萱入院时情况已经非常严重，意识恢复可能性极低。相关颜料来源正在进一步调查中。</p>
    `
  },
  "ritual-note": {
    title: "仪式转存记录",
    html: `
      <p>这份内容来自黑箱同城的旧帖子，标题被管理员改成了<strong>奥窟耶他仪式</strong>。帖子说明声称，毕业前夜在空教室完成仪式，可以让在场者实现愿望。</p>
      <p>仪式要求提前准备咒语和符咒。转存文本里写得很清楚：<strong>仪式详解，解释需要提前准备好血染的符咒和咒语</strong>。美术委员林若萱后来提供了符咒，她说只是照着论坛图片临摹。</p>
      <p>帖子最危险的地方在“献祭”一词。梁致远以为献祭意味着把某个人从大家的生活里抹掉，却没人知道真正的意思是附身。</p>
      <p>页面末尾有一行损坏代码：<strong>符咒代码</strong>。它指向一个被删掉的画作页面，只有信息委员的备份里还留着副本。</p>
    `
  },
  "art-diary": {
    title: "美术委员日记",
    html: `
      <article class="role-diary-paper art-villain-diary">
        <p>最开始，我只是在黑箱论坛里找能让事业顺利一点的办法。没想到那篇帖子写的东西竟然是真的。</p>
        <p>我把内容给了梁致远，又告诉他该怎么准备符咒。他果然上钩了。只需要让他觉得自己才是组织者，他就会替我召集所有人、准备地点，还会心甘情愿地承担风险。</p>
        <p>我对结果很满意。大家都拿到了自己想要的东西：我得到了事业上的成功，梁致远的两个朋友得到了钱财。至于梁致远那个傻瓜，到最后竟然还在装善良，许下的愿望居然是<strong>让所有人忘记这件事发生过</strong>。</p>
        <p>最大的变数一直是林媛。被献祭者同样能够实现愿望，如果她想要的是报复，那我们就全完了。所以我才特地选了她——班里出了名的老好人。像她那样的人，即使到了最后，也只会希望别人过得好。</p>
        <p>倒是肖青让我有点在意。我不知道他许了什么愿望，问他，他也不肯说。还是得好好观察他。</p>
        <p>如果他真的会坏事，那就再献祭一次，把他除掉。</p>
        <p class="role-file-signature">2016年7月10日　林若萱</p>
      </article>
    `
  },
  "class-album": {
    title: "班级相册",
    html: `
      <div class="role-file-gallery">
        <figure><img src="../sport.png" alt="秋季运动会合照"><figcaption>2014 秋季运动会</figcaption></figure>
        <figure><img src="../spring.png" alt="春游合照"><figcaption>2015 春游合照</figcaption></figure>
        <figure><img src="../dimpome.png" alt="毕业前的教室合照"><figcaption>2016 毕业前的教室</figcaption></figure>
        <figure><img src="../credit.png" alt="窗边街景"><figcaption>熟悉的街景</figcaption></figure>
        <figure><img src="../art.png" alt="美术相关照片"><figcaption>林若萱是我们的骄傲</figcaption></figure>
        <figure><img src="../computer.png" alt="机房照片"><figcaption>大家最喜欢的地方</figcaption></figure>
      </div>
    `
  },
  "hospital-report": {
    title: "病例",
    html: `
      <p>患者姓名：肖青。该病例由旧系统扫描件转存为只读文本。</p>
      <p>主诉记录里写着：患者长期回避高三毕业前后的记忆，反复否认曾参与某次夜间外出。家属称其高考后情绪急剧波动，睡眠差，易惊醒。</p>
      <p>医生初步判断为<strong>怀疑因为高考出现心理问题</strong>，但后续复诊中又记录了更具体的症状：患者会对“班长”“七个人”“小青”等词产生明显回避。</p>
      <p>检查意见：<strong>出现失忆症状</strong>，建议心理咨询配合药物治疗。治疗方案栏写着：<strong>建议治疗方案：药物治疗</strong>。但报告最后另有手写字迹：“他不是忘了，是不敢想起来。”</p>
    `
  },
  "sports-info-removal": {
    title: "信息修改记录",
    html: `
      <dl class="role-file-change-list">
        <dt>修改日期</dt>
        <dd>2016-07-09</dd>
        <dt>修改账号</dt>
        <dd>qx17（肖青）</dd>
        <dt>修改范围</dt>
        <dd>网站全部公开信息</dd>
        <dt>修改内容</dt>
        <dd>已成功从网站的所有信息中移除：肖青</dd>
      </dl>
    `
  },
  "sports-familiar-self": {
    title: "熟悉的字迹",
    html: `
      <article class="role-diary-paper">
        <p>我和林媛是被班长邀请去参加那场仪式的。班长威胁我，说除非我把林媛带过来，否则就要献祭我。我没有想到仪式竟然是真的，更没有想到林媛真的会消失。</p>
        <p>据说参加仪式的每个人都可以实现愿望，包括林媛。可是，只有我的愿望没有实现。难道这就是神明对我的惩罚？</p>
        <p>我感觉最近自己的记忆力和判断力越来越糟糕。希望这不是某个人许下的愿望吧……</p>
        <p>如果可以的话，我会请信息委员黑掉美术委员的账号。据说仪式的具体信息都在她的账号里。但是我现在真的好累。等明天如果感觉好一点，我就这么做吧。</p>
        <p class="role-file-signature">2016-07-20　肖青</p>
        <p class="truth-revealed"><a href="34-author-note.html">恭喜你，查明了事情的真相，肖青。</a></p>
      </article>
    `
  },
  "recovery-login": {
    title: "恢复登录",
    html: `
      <p>恢复登录需要输入一个词：<strong>真相</strong>。页面没有再询问用户名，因为它已经知道访问者是谁。</p>
      <p>系统提示：你尚有一次未使用的愿望。仪式没有失败，只是你在崩溃前没有说出口。</p>
      <p>可选项一：<strong>使用自己的愿望</strong>，让女孩回来，恢复原样。页面警告：信息委员将从网站中失踪，所有被神恩改写过的记录会重新结算。</p>
      <p>可选项二：<strong>满足自己的愿望，享受荣华富贵，女孩失踪</strong>。页面没有解释代价，只在按钮下面写了一句：“奥窟耶他从不白给任何人。”</p>
      <p>这里不是普通登录。它是在问肖云，是否愿意承认自己就是肖青，是否愿意把最后一份没有使用的愿望交出去。</p>
    `
  },
  "info-diary-01": {
    title: "信息委员日记 1",
    html: `
      <article class="role-diary-paper">
        <p>班长的<strong>管理员</strong>账号太好猜了，竟然用自己的宠物狗的名字作为密码，这样一来，仪式的完整信息也就得到了，一切都已经快要完成了，我一定要让媛媛有一个好的归宿。</p>
        <p class="role-file-signature">2020年6月18日　许知夏</p>
      </article>
    `
  },
  "info-diary-02": {
    title: "信息委员日记 2",
    html: `
      <article class="role-diary-paper">
        <p>媛媛失踪前一天来找过我。她说班长约了几个人去学校，说毕业前再做一次“只有自己人知道”的活动。</p>
        <p>她不太想去，但又怕扫大家的兴。她还说运动委员也会去，美术委员准备了纸和图案，班长的三个朋友负责看门。</p>
        <p>我问她是不是恶作剧，她说不知道，只听见他们提到一个从论坛上看到的办法。<strong>那天她告诉我，说和班长还有别的同学出去，然后失踪了</strong>。</p>
        <p>所有人都说她可能离家出走，后来又说我们班根本没有这个人。只有网站不肯承认这件事，它总是把她的名字从别人的备注里顶出来。</p>
        <p>把哈希值用哈希加密，我可能是一个天才吧，就算他们有人能够破译一次，也永远不会想到连着破译两次吧，哈哈……原始密码的话，那就设置为今天的日期就好了。</p>
      </article>
    `
  },
  "info-diary-03": {
    title: "信息委员日记 3",
    html: `
      <article class="role-diary-paper">
        <p>我终于知道还剩谁了。不是梁致远，不是林若萱，也不是那三个跟在班长后面的人。他们都已经被返魂录找到了。</p>
        <p>还剩一个人。那个人当年也在现场，却把自己的名字从学生名单里抹掉了。现在他叫肖云，可我记得媛媛以前叫他<strong>小青</strong>。</p>
        <p>旧名单里写的是<strong>肖青</strong>。如果他真的什么都不记得，为什么连名字都换了？为什么一看到“七月重大事件”就不敢继续点？</p>
        <p><strong>当时的目击者还剩下一个竟然失忆了，还给自己换了个名字，有用么</strong>。网站会找到他的。媛媛也会。</p>
      </article>
    `
  },
  "soul-return-log": {
    title: "返魂记录",
    html: `
      <p>记录状态：<strong>招魂已经成功，不可逆转</strong>。页面说明里写，除非让现场所有见证者承认并归还所得，否则被请来的东西不会离开。</p>
      <p>返魂名单一共七人。<strong>班长，已经死亡，返魂结果成功</strong>。林若萱，返魂结果成功，现实状态为<strong>植物人</strong>。魏兆、方砚、赵临三人的状态分别记录为煤气中毒、滑雪事故、夜间坠落。</p>
      <p>名单最底部缺了一行。系统提示：<strong>缺了一个同学的名字</strong>。备注栏只有两个字：自己。</p>
      <p>返魂录的解释非常简单：返魂不是让死人回来，而是让活人的一部分交出去。<strong>归魂也就是让自己的灵魂分给林媛同学</strong>。谁在当年得到了愿望，谁就该还。</p>
    `
  }
};

const params = new URLSearchParams(window.location.search);
const roleId = params.get("role");
const fileId = params.get("file");
const role = dashboardRoles[roleId];
const record = fileRecords[fileId];
const backLink = document.querySelector("#backToDashboard");
const kicker = document.querySelector("#detailKicker");
const title = document.querySelector("#detailTitle");
const content = document.querySelector("#detailContent");

if (!role || !record || !role.files.includes(fileId)) {
  document.body.classList.add("theme-light");
  title.textContent = "无法读取文件";
  content.innerHTML = "<p>文件不存在，或当前账号没有访问权限。</p>";
} else {
  document.body.classList.add(`theme-${role.theme}`, `theme-${roleId}`);
  document.title = `${record.title} - ${role.title}`;
  backLink.href = role.dashboard;
  kicker.textContent = `${role.title} / READ ONLY`;
  title.textContent = record.title;
  content.innerHTML = record.html;
}
