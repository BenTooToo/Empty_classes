const dashboardRoles = {
  monitor: {
    title: "班长后台",
    theme: "dark",
    dashboard: "admin-monitor-dashboard.html",
    files: ["monitor-diary", "monitor-chat", "absence-correction", "shadow-exchange-ritual"]
  },
  art: {
    title: "美术委员后台",
    theme: "dark",
    dashboard: "admin-art-dashboard.html",
    files: ["art-profile", "art-news", "ritual-note", "class-album"]
  },
  sports: {
    title: "体育委员后台",
    theme: "light",
    dashboard: "admin-sports-dashboard.html",
    files: ["familiar-handwriting", "hospital-report", "recovery-login"]
  },
  info: {
    title: "信息委员后台",
    theme: "light",
    dashboard: "admin-info-dashboard.html",
    files: ["info-account", "info-diary-01", "info-diary-02", "info-diary-03", "soul-return-log"]
  }
};

const fileRecords = {
  "monitor-diary": {
    title: "班长日记",
    html: `
      <article class="role-diary-paper">
        <p>梁致远把这篇日记命名为“最后一次整理”。里面夹着他和信息委员的聊天记录。聊天第一句是：<strong>仪式是真的</strong>。</p>
        <p>他承认自己当年许下的愿望是让林媛消失。那时他以为消失只是离开折棠6中，离开所有同学的视线，不会有人真的受伤。</p>
        <p>但信息委员告诉他，返魂需要所有在场者一起归还所得。梁致远写：<strong>我已经查过了，需要当时在现场的所有人都将灵魂献给林媛同学才行</strong>。</p>
        <p>日记最后一句是：“我已经和信息委员说好了，他会把一切都安排好的。”这句话保存了三次，每一次都比上一次更晚。</p>
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
            <time>2020-10-26 23:48</time>
          </div>
          <div class="chat-message chat-left">
            <strong>梁致远<span class="chat-user-id">admin-07</span></strong>
            <p>仪式是真的。</p>
          </div>
          <div class="chat-message chat-right">
            <strong>许知夏<span class="chat-user-id">quietarchive</span></strong>
            <p>你终于承认了。那就不要再说这是网站故障。</p>
          </div>
          <div class="chat-message chat-left">
            <strong>梁致远<span class="chat-user-id">admin-07</span></strong>
            <p>我已经查过了，需要当时在现场的所有人都将灵魂献给林媛同学才行。</p>
          </div>
          <div class="chat-message chat-right">
            <strong>许知夏<span class="chat-user-id">quietarchive</span></strong>
            <p>我会把一切都安排好。你只要把名单和缺席记录留给我。</p>
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
        <dd>已成功从学生名单中移除：林缘。</dd>
        <dt>毕业照片缺席人数</dt>
        <dd>1 人 → 0 人</dd>
      </dl>
    `
  },
  "shadow-exchange-ritual": {
    title: "奥摩耶他降魂仪式详解",
    html: `
      <article class="role-ritual-document">
        <h2>奥摩耶他降魂仪式</h2>
        <section>
          <h3>时间</h3>
          <p>半夜。</p>
        </section>
        <section>
          <h3>地点</h3>
          <p>任意地点。</p>
        </section>
        <section>
          <h3>准备</h3>
          <p>献祭一人的灵魂。</p>
          <p>画下符咒。</p>
        </section>
        <section>
          <h3>方法</h3>
          <p>在符咒完成后念出咒语。</p>
        </section>
        <section>
          <h3>结果</h3>
          <p>所有参加仪式的人，都可以获得实现一个愿望。</p>
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
  "familiar-handwriting": {
    title: "熟悉的字迹",
    html: `
      <p>这份草稿没有署名，但字迹和肖云旧笔记非常像。第一页只写了四个字：<strong>坦白真相</strong>。</p>
      <p>后面的句子断断续续：“我也是旁观者的一份子，我就是那第七个人。其他人一个一个全部都死了，这一定是她的灵魂在作祟。”</p>
      <p>草稿中间夹着一串数字：<strong>21</strong>。旁边有一句像是写给自己的提醒：“如果你忘了账号，就从自己的名字开始找。”</p>
      <p>最后一段被保存成系统提示：我已经记不住我的账户和密码了，我把它记下来，这样就不会有问题了。游客权限不足。检测到旧账号残留，请使用管理员身份继续。</p>
    `
  },
  "hospital-report": {
    title: "医院报告单",
    html: `
      <p>患者姓名：肖云。旧系统备注显示，该扫描件原本需要输入<strong>玩家真名</strong>才能查看，后来被管理员转成了纯文本备份。</p>
      <p>主诉记录里写着：患者长期回避高三毕业前后的记忆，反复否认曾参与某次夜间外出。家属称其高考后情绪急剧波动，睡眠差，易惊醒。</p>
      <p>医生初步判断为<strong>怀疑因为高考出现心理问题</strong>，但后续复诊中又记录了更具体的症状：患者会对“班长”“七个人”“小青”等词产生明显回避。</p>
      <p>检查意见：<strong>出现失忆症状</strong>，建议心理咨询配合药物治疗。治疗方案栏写着：<strong>建议治疗方案：药物治疗</strong>。但报告最后另有手写字迹：“他不是忘了，是不敢想起来。”</p>
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
  "info-account": {
    title: "账号登录记录",
    html: `
      <p>账号备注：<strong>信息委员</strong>。旧系统要求输入<strong>用户名</strong>和<strong>密码</strong>，但只读镜像已经不再校验。管理员留下的说明里写着：不要把真正的班级邮箱密码放在网页上。</p>
      <p>许知夏负责过站点备份、留言恢复和相册编号。她给自己的管理员页加了一个私有标签：<strong>七月重大事件</strong>。标签后面的链接早就失效，只剩页面标题还在索引里。</p>
      <p>另一个被隐藏的目录名叫<strong>罪孽校舍</strong>。它不像正常文件夹，更像某个人后来给旧资料取的新名字。页面提示：如果搜索结果出现这个词，请不要继续公开转发。</p>
      <p>管理员备注最后一行被反复保存过，时间戳全都在凌晨：“有些东西不是从网站上删掉就不存在了。”</p>
    `
  },
  "info-diary-01": {
    title: "信息委员日记 1",
    html: `
      <p>班长的<strong>管理员</strong>账号太好猜了，竟然用自己的宠物狗的名字作为密码，这样一来，仪式的完整信息也就得到了，一切都已经快要完成了，我一定要让媛媛有一个好的归宿。</p>
      <p class="role-file-signature">2020年6月18日　许知夏</p>
    `
  },
  "info-diary-02": {
    title: "信息委员日记 2",
    html: `
      <p>媛媛失踪前一天来找过我。她说班长约了几个人去学校，说毕业前再做一次“只有自己人知道”的活动。</p>
      <p>她不太想去，但又怕扫大家的兴。她还说运动委员也会去，美术委员准备了纸和图案，班长的三个朋友负责看门。</p>
      <p>我问她是不是恶作剧，她说不知道，只听见他们提到一个从论坛上看到的办法。<strong>那天她告诉我，说和班长还有别的同学出去，然后失踪了</strong>。</p>
      <p>所有人都说她可能离家出走，后来又说我们班根本没有这个人。只有网站不肯承认这件事，它总是把她的名字从别人的备注里顶出来。</p>
    `
  },
  "info-diary-03": {
    title: "信息委员日记 3",
    html: `
      <p>我终于知道还剩谁了。不是梁致远，不是林若萱，也不是那三个跟在班长后面的人。他们都已经被返魂录找到了。</p>
      <p>还剩一个人。那个人当年也在现场，却把自己的名字从学生名单里抹掉了。现在他叫肖云，可我记得媛媛以前叫他<strong>小青</strong>。</p>
      <p>旧名单里写的是<strong>肖青</strong>。如果他真的什么都不记得，为什么连名字都换了？为什么一看到“七月重大事件”就不敢继续点？</p>
      <p><strong>当时的目击者还剩下一个竟然失忆了，还给自己换了个名字，有用么</strong>。网站会找到他的。媛媛也会。</p>
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
